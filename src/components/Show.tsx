import React, { Fragment, ReactNode } from "react";

type Props = {
  if: boolean;
  children: ReactNode | ReactNode[];
};

const Show = ({ if: cond, children }: Props) => {
  if (!cond) return null;
  return <Fragment>{children}</Fragment>;
};

export default Show;
