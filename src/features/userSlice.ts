import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSignIn_userSignIn } from "../graphql/mutations/__generated__/UserSignIn";

export interface UserState extends UserSignIn_userSignIn {}

const initialState: UserState = {
  token: "",
  __typename: "AuthPayload",
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticate: (
      state,
      { payload }: PayloadAction<UserSignIn_userSignIn>
    ) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { authenticate, logout } = userSlice.actions;

export default userSlice.reducer;
