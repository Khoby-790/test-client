import { useMutation } from "@apollo/client";
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Button, Footer, Input, PasswordInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../app/hooks";
import ErrorMessage from "../../../components/ErrorMessage";
import { authenticate } from "../../../features/userSlice";
import { signIn, signUp } from "../../../graphql/mutations/auth";
import {
  UserSignIn,
  UserSignInVariables,
  UserSignIn_userSignIn,
} from "../../../graphql/mutations/__generated__/UserSignIn";

type Props = {
  setClose: React.Dispatch<SetStateAction<boolean>>;
};

const SignInForm = ({ setClose }: Props) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignInVariables>();
  const [execute, { loading }] = useMutation<UserSignIn, UserSignInVariables>(
    signIn
  );

  const onSubmit: SubmitHandler<UserSignInVariables> = (variables) => {
    execute({ variables })
      .then(({ data }) => {
        dispatch(authenticate(data?.userSignIn as UserSignIn_userSignIn));
        setClose(false);
      })
      .catch((err) => {
        showNotification({
          message: err?.message,
          title: "Error",
          color: "red",
        });
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Input
          size="lg"
          icon={<AtSymbolIcon className="h-5 w-5" />}
          placeholder="Your email"
          {...register("input.email", { required: "Required" })}
        />
        <ErrorMessage name="input.email" errors={errors} />
      </div>
      <div>
        <PasswordInput
          size="lg"
          icon={<LockClosedIcon className="h-5 w-5" />}
          placeholder="Your password"
          {...register("input.password", { required: "Required" })}
        />
        <ErrorMessage name="input.password" errors={errors} />
      </div>

      <Footer className="py-3 flex justify-end" height={""}>
        <Button
          disabled={loading}
          type="submit"
          loading={loading}
          size="lg"
          variant="filled"
          className="bg-blue-500"
        >
          Sign In
        </Button>
      </Footer>
    </form>
  );
};

export default SignInForm;
