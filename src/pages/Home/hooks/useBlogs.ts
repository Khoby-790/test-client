import { useQuery } from "@apollo/client";
import { getBlogs } from "../../../graphql/queries";
import {
  GetBlogs,
  GetBlogsVariables,
} from "../../../graphql/queries/__generated__/GetBlogs";

export const useBlogs = (variables?: GetBlogsVariables) => {
  const { data, loading, error, fetchMore, networkStatus } = useQuery<
    GetBlogs,
    GetBlogsVariables
  >(getBlogs, {
    variables,
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

  return {
    blogs: data?.getBlogs ?? [],
    loading,
    error,
    networkStatus,
    fetchMore,
  };
};
