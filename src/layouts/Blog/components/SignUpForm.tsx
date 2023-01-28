import { useMutation } from "@apollo/client";
import {
  AtSymbolIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Input, PasswordInput, Footer, Button } from "@mantine/core";
import React, { SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../app/hooks";
import ErrorMessage from "../../../components/ErrorMessage";
import { signUp } from "../../../graphql/mutations/auth";
import { UserSignIn_userSignIn } from "../../../graphql/mutations/__generated__/UserSignIn";
import {
  UserSignUp,
  UserSignUpVariables,
} from "../../../graphql/mutations/__generated__/UserSignUp";
import { authenticate } from "../../../features/userSlice";
import { showNotification } from "@mantine/notifications";

type Props = {
  setClose: React.Dispatch<SetStateAction<boolean>>;
};

const SignUpForm = ({ setClose }: Props) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpVariables>();
  const [execute, { loading }] = useMutation<UserSignUp, UserSignUpVariables>(
    signUp
  );

  const onSubmit: SubmitHandler<UserSignUpVariables> = (variables) => {
    execute({ variables })
      .then(({ data }) => {
        dispatch(authenticate(data?.userSignUp as UserSignIn_userSignIn));
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
      <div className="grid grid-cols-2 gap-x-3">
        <div>
          <Input
            size="lg"
            icon={<UserIcon className="h-5 w-5" />}
            placeholder="Your firstname"
            {...register("input.first_name", { required: "Required" })}
          />
          <ErrorMessage name="input.first_name" errors={errors} />
        </div>
        <div>
          <Input
            size="lg"
            icon={<UserIcon className="h-5 w-5" />}
            placeholder="Your lastname"
            {...register("input.last_name", { required: "Required" })}
          />
          <ErrorMessage name="input.last_name" errors={errors} />
        </div>
      </div>
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
          loading={loading}
          disabled={loading}
          type="submit"
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

export default SignUpForm;
