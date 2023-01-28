import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { store } from "../app/store";

const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8001/graphql"
    : "http://localhost:8001/graphql";

export const TOKEN_str = "duke-token-web";

const httpLink = createHttpLink({
  uri: URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = store.getState().user.token;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token: token ? token : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export { client };
