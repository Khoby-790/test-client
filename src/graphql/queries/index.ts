import { gql } from "@apollo/client";

export const getBlogs = gql`
  query GetBlogs($filter: BlogFilter, $pagination: Pagination) {
    getBlogs(filter: $filter, pagination: $pagination) {
      id
      title
      banner
      body
      likes
      dislikes
      createdAt
      updatedAt
      author {
        id
        email
        first_name
        last_name
      }
    }
    getBlogsLength(filter: $filter)
  }
`;
