declare module "./store/store.js" {
  import { Store } from "@reduxjs/toolkit";
  import { RootState } from "./types/AuthTypes";

  const store: Store<RootState>; // Assuming RootState is the type of your root state
  export default store;
}
