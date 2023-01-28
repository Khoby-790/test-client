import { Input } from "@mantine/core";
import { superstate } from "@superstate/core";
import { useEffect, useState } from "react";
import { useInView } from "react-hook-inview";
import BlogItem from "../../components/BlogItem";
import Show from "../../components/Show";
import { useBlogs } from "./hooks/useBlogs";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid";
import useDebounce from "../../components/useDebounce";

const offset = superstate(0);
const LIMIT = 6;

const Home = () => {
  const [ref, inView] = useInView();
  const [search, setSearch] = useState("");
  const searchValue = useDebounce(search, 500, () => {
    offset.set(0);
  });
  const { blogs, fetchMore, length } = useBlogs({
    pagination: {
      offset: 0,
      limit: 6,
    },
    filter: {
      title: searchValue
        ? {
            like: searchValue,
          }
        : undefined,
    },
  });

  const handleOnEndReached = () => {
    console.log("Hello there", offset.now() + LIMIT, length);
    if (length > offset.now() + LIMIT) {
      // setOffset(offset + limit);
      return fetchMore({
        variables: {
          pagination: {
            offset: offset.now() + LIMIT,
            limit: LIMIT,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          offset.set(offset.now() + LIMIT);
          if (!fetchMoreResult) return prev;
          return {
            getBlogs:
              prev.getBlogs?.concat(fetchMoreResult.getBlogs as any) || [],
            getBlogsLength: fetchMoreResult.getBlogsLength || 0,
          };
          // return prev;
        },
      });
    }
  };

  useEffect(() => {
    if (inView) {
      handleOnEndReached();
    }
  }, [inView]);

  return (
    <div className="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white sm:h-2/3" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {search || "From the blog"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            <Input
              size="md"
              placeholder="Search blogs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<MagnifyingGlassCircleIcon className="h-4 w-4" />}
            />
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {blogs.map((post) => (
            <BlogItem post={post} />
          ))}
        </div>
        <Show if={blogs.length < length}>
          <div ref={ref}>{inView ? "Here" : ""}</div>
        </Show>
      </div>
    </div>
  );
};

export default Home;
