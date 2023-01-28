/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogFilter, Pagination } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetBlogs
// ====================================================

export interface GetBlogs_getBlogs_author {
  __typename: "User";
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface GetBlogs_getBlogs {
  __typename: "Blog";
  id: string;
  title: string;
  banner: string;
  body: string;
  likes: number;
  dislikes: number;
  createdAt: any;
  updatedAt: any;
  author: GetBlogs_getBlogs_author | null;
}

export interface GetBlogs {
  getBlogs: GetBlogs_getBlogs[] | null;
}

export interface GetBlogsVariables {
  filter?: BlogFilter | null;
  pagination?: Pagination | null;
}
