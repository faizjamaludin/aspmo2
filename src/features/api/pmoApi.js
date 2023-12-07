import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pmoApi = createApi({
  reducerPath: "pmoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  }),
  endpoints: (builder) => ({}),
});

export const {} = pmoApi;
