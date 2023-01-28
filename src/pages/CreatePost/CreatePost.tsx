import { useMutation } from "@apollo/client";
import {
  Button,
  Card,
  Footer,
  Input,
  LoadingOverlay,
  Textarea,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import ErrorMessage from "../../components/ErrorMessage";
import { createBlog } from "../../graphql/mutations/auth";
import {
  CreateBlog,
  CreateBlogVariables,
} from "../../graphql/mutations/__generated__/CreateBlog";

type Props = {};

const CreatePost = (props: Props) => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBlogVariables>({});
  const [execute, { loading }] = useMutation<CreateBlog, CreateBlogVariables>(
    createBlog
  );

  const onSubmit: SubmitHandler<CreateBlogVariables> = (variables) => {
    execute({ variables })
      .then(({ data }) => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        showNotification({
          message: err?.message,
          title: "Error",
          color: "red",
        });
      });
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white sm:h-2/3" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mx-auto max-w-7xl"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Create your blog
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
            libero labore natus atque, ducimus sed.
          </p>
        </div>
        <Card className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none  lg:grid-cols-1">
          <LoadingOverlay visible={loading} />
          <div>
            <label htmlFor="Title">Title</label>
            <Input
              size="md"
              {...register("input.title", { required: "Required" })}
            />
            <ErrorMessage name="input.title" errors={errors} />
          </div>
          <div>
            <label htmlFor="Body">Body</label>
            <Textarea
              size="md"
              {...register("input.body", { required: "Required" })}
            />
            <ErrorMessage name="input.body" errors={errors} />
          </div>
          <Footer className="py-3 flex justify-end" height={""}>
            <Button
              disabled={loading}
              type="submit"
              loading={loading}
              size="lg"
              variant="filled"
              className="bg-blue-500"
            >
              Create Post
            </Button>
          </Footer>
        </Card>
      </form>
    </div>
  );
};

export default CreatePost;
