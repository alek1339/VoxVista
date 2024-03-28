import store from "../store/store";
import rootReducer from "../store/reducers";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
