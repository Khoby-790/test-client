import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Button, Footer, Input, PasswordInput } from "@mantine/core";
import { IconAt } from "@tabler/icons";
import React from "react";

type Props = {};

const SignInForm = (props: Props) => {
  return (
    <div className="space-y-5">
      <Input
        size="lg"
        icon={<AtSymbolIcon className="h-5 w-5" />}
        placeholder="Your email"
      />
      <PasswordInput
        size="lg"
        icon={<LockClosedIcon className="h-5 w-5" />}
        placeholder="Your password"
      />
      <Footer className="py-3 flex justify-end" height={""}>
        <Button size="lg" variant="filled" className="bg-blue-500">
          Sign In
        </Button>
      </Footer>
    </div>
  );
};

export default SignInForm;
