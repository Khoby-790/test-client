import { CogIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Avatar, Button, Dialog, Modal, UnstyledButton } from "@mantine/core";
import moment from "moment";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { GetBlogs_getBlogs } from "../graphql/queries/__generated__/GetBlogs";
import Show from "./Show";
import { useDeleteBlog } from "./useDeleteBlog";

type Props = {
  post: GetBlogs_getBlogs;
};

const BlogItem = ({ post }: Props) => {
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const { removeBLog, loading } = useDeleteBlog(
    () => setShowDeletePrompt(false),
    {
      removeBlogId: post?.id,
    }
  );
  return (
    <Fragment>
      <div
        key={post.title}
        className="flex flex-col overflow-hidden rounded-lg shadow-lg"
      >
        <div className="flex-shrink-0">
          <img className="h-48 w-full object-cover" src={post.banner} alt="" />
        </div>
        <div className="flex flex-1 flex-col justify-between bg-white p-6">
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-600">
              <a className="hover:underline">Article</a>
            </p>
            <a className="mt-2 block">
              <p className="text-xl font-semibold text-gray-900">
                {post.title}
              </p>
              <p className="mt-3 text-base text-gray-500">{post.body}</p>
            </a>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex">
              <div className="flex-shrink-0">
                <a>
                  <span className="sr-only">{post.author?.first_name}</span>
                  <Avatar>
                    {post.author?.first_name.charAt(0)}
                    {post.author?.last_name.charAt(0)}
                  </Avatar>
                </a>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  <a className="hover:underline">
                    {post.author?.first_name} {post.author?.last_name}
                  </a>
                </p>
                <div className="flex space-x-1 text-sm text-gray-500">
                  <time dateTime={post.createdAt}>
                    {moment(post.createdAt).fromNow()}
                  </time>
                  <span aria-hidden="true">&middot;</span>
                  <span>5 read</span>
                </div>
              </div>
            </div>

            <Show if={user?.id === post.author?.id}>
              <div className="flex items-center space-x-3">
                <Link to="/update-post" state={post}>
                  <PencilIcon className="h-5 w-5" />
                </Link>
                <UnstyledButton onClick={() => setShowDeletePrompt(true)}>
                  <TrashIcon className="h-5 w-5 text-red-600" />
                </UnstyledButton>
              </div>
            </Show>
          </div>
        </div>
      </div>

      <Dialog
        opened={showDeletePrompt}
        onClose={() => setShowDeletePrompt(false)}
        bg="red"
        size={"300"}
      >
        <div className="relative transform overflow-hidden rounded-lg b px-4  text-left transition-all  sm:w-full sm:max-w-lg sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              {/* <!-- Heroicon name: outline/exclamation-triangle --> */}
              <svg
                className="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg font-medium leading-6 text-gray-900"
                id="modal-title"
              >
                Delete Post
              </h3>
              <div className="mt-2">
                <p className="text-sm text-white">
                  Are you sure you want to deactivate your account? All of your
                  data will be permanently removed from our servers forever.
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <Button
              type="button"
              loading={loading}
              disabled={loading}
              bg="red"
              onClick={() => removeBLog()}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Deactivate
            </Button>
            <button
              type="button"
              onClick={() => setShowDeletePrompt(false)}
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default BlogItem;
