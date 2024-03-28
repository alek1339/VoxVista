declare module "./store/store.js" {
  import { Store } from "@reduxjs/toolkit";
  import { RootState } from "./types/AppTypes";

  const store: Store<RootState>;
  export default store;
}
