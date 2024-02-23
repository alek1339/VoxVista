// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
  user: authSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
