/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface BlogFilter {
  id?: IdOperator | null;
  title?: StringOperator | null;
}

export interface BlogInput {
  id?: string | null;
  title: string;
  body: string;
  banner?: string | null;
}

export interface IdOperator {
  eq?: string | null;
  in?: string[] | null;
  notIn?: string[] | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface Pagination {
  offset?: number | null;
  limit?: number | null;
}

export interface RegisterInput {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface StringOperator {
  eq?: string | null;
  notEq?: string | null;
  like?: string | null;
  notContains?: string | null;
  in?: string[] | null;
  notIn?: string[] | null;
  regex?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
