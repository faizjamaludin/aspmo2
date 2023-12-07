import { configureStore } from "@reduxjs/toolkit";
import { pmoApi } from "./api/pmoApi";

export const store = configureStore({
  reducer: {
    [pmoApi.reducerPath]: pmoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pmoApi.middleware),
});
