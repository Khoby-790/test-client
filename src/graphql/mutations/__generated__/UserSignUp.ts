/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegisterInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UserSignUp
// ====================================================

export interface UserSignUp_userSignUp_user {
  __typename: "User";
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface UserSignUp_userSignUp {
  __typename: "AuthPayload";
  token: string;
  user: UserSignUp_userSignUp_user | null;
}

export interface UserSignUp {
  userSignUp: UserSignUp_userSignUp | null;
}

export interface UserSignUpVariables {
  input?: RegisterInput | null;
}
