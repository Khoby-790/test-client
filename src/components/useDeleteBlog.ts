import { useMutation } from "@apollo/client";
import { deleteBlog } from "../graphql/mutations/auth";
import {
  RemoveBlog,
  RemoveBlogVariables,
} from "../graphql/mutations/__generated__/RemoveBlog";

export const useDeleteBlog = (
  callBack: () => void,
  variables?: RemoveBlogVariables
) => {
  const [removeBLog, { loading }] = useMutation<
    RemoveBlog,
    RemoveBlogVariables
  >(deleteBlog, {
    variables,
    refetchQueries: ["GetBlogs"],
    onCompleted: () => callBack(),
  });

  return {
    removeBLog,
    loading,
  };
};
