import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  token: string;
}

const initialState: UserState = {
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticate: (state, { payload }: PayloadAction<any>) => {
      //   state.employee = payload.employee;
      //   state.token = payload.token;
    },
    logout: (state) => {
      //   state.employee = null;
      //   state.token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { authenticate, logout } = userSlice.actions;

export default userSlice.reducer;
