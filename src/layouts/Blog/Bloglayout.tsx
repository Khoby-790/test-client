import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./sections/Navbar";

type Props = {};

const Bloglayout = (props: Props) => {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
};

export default Bloglayout;
