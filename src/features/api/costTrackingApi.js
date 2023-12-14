import { pmoApi } from "./pmoApi";

const costTrackingApi = pmoApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBq: builder.query({
      query: () => `/bqs`,
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["Cost Tracking"],
    }),
    getBqByBqId: builder.query({
      query: (bqId) => `/bq?bqId=${bqId}`,
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["Cost Tracking", bqId],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllBqQuery, useGetBqByBqIdQuery } = costTrackingApi;
