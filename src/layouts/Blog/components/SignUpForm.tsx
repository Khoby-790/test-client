import { useMutation } from "@apollo/client";
import {
  AtSymbolIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Input, PasswordInput, Footer, Button } from "@mantine/core";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../../../components/ErrorMessage";
import { signUp } from "../../../graphql/mutations/auth";
import {
  UserSignUp,
  UserSignUpVariables,
} from "../../../graphql/mutations/__generated__/UserSignUp";

type Props = {};

const SignUpForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpVariables>();
  const [] = useMutation<UserSignUp, UserSignUpVariables>(signUp);

  const onSubmit: SubmitHandler<UserSignUpVariables> = (data) => {
    console.log(data);
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
