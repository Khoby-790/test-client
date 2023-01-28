import { ApolloProvider } from "@apollo/client";
import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { client } from "./graphql/client";
import { NotificationsProvider } from "@mantine/notifications";

import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider position="top-right">
          <App />
        </NotificationsProvider>
      </MantineProvider>
    </ApolloProvider>
  </Provider>
);
