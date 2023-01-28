import { useQuery } from "@apollo/client";
import { getBlogs } from "../../../graphql/queries";
import {
  GetBlogs,
  GetBlogsVariables,
} from "../../../graphql/queries/__generated__/GetBlogs";

export const useBlogs = (variables?: GetBlogsVariables) => {
  const { data, loading, error, fetchMore, networkStatus, called } = useQuery<
    GetBlogs,
    GetBlogsVariables
  >(getBlogs, {
    variables,
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  return {
    blogs: data?.getBlogs ?? [],
    length: data?.getBlogsLength ?? 0,
    loading,
    error,
    networkStatus,
    fetchMore,
    called,
  };
};
