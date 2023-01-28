import _ from "lodash";
import React from "react";

type Props = {
  name: string;
  errors: Record<string, any>;
};

const ErrorMessage = ({ errors, name }: Props) => {
  const hasError = _.get(errors, name);
  if (!hasError) return null;
  return <p className="text-red-500 text-xs">{hasError?.message}</p>;
};

export default ErrorMessage;
