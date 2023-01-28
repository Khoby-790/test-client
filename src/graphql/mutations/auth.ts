import { gql } from "@apollo/client";

export const signIn = gql`
  mutation UserSignIn($input: LoginInput) {
    userSignIn(input: $input) {
      token
      user {
        id
        email
        first_name
        last_name
      }
    }
  }
`;

export const signUp = gql`
  mutation UserSignUp($input: RegisterInput) {
    userSignUp(input: $input) {
      token
      user {
        id
        email
        first_name
        last_name
      }
    }
  }
`;

export const createBlog = gql`
  mutation CreateBlog($input: BlogInput) {
    createBlog(input: $input)
  }
`;

export const deleteBlog = gql`
  mutation RemoveBlog($removeBlogId: ID!) {
    removeBlog(id: $removeBlogId)
  }
`;
export const updateBlog = gql`
  mutation UpdateBlog($input: BlogInput) {
    updateBlog(input: $input)
  }
`;
