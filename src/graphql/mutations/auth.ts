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
