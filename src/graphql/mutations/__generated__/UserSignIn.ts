/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserSignIn
// ====================================================

export interface UserSignIn_userSignIn_user {
  __typename: "User";
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface UserSignIn_userSignIn {
  __typename: "AuthPayload";
  token: string;
  user: UserSignIn_userSignIn_user | null;
}

export interface UserSignIn {
  userSignIn: UserSignIn_userSignIn | null;
}

export interface UserSignInVariables {
  input?: LoginInput | null;
}
