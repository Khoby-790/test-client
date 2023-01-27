import { combineReducers } from "redux";

import storage from "redux-persist/lib/storage";

import userSlice from "../../features/userSlice";

const rootSlice = combineReducers({
  user: userSlice,
});

export default rootSlice;
