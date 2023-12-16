import { pmoApi } from "./pmoApi";

const costTrackingApi = pmoApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBq: builder.query({
      query: () => `/bqs`,
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
      providesTags: ["Cost Tracking"],
    }),
    getBqByProjectId: builder.query({
      query: (projectId) => `/bqs?projectId=${projectId}`,
      transformResponse: (response, meta, arg) => {
        const res = response.data;

        return res;
      },
      providesTags: ["Cost Tracking"],
    }),
    getBqByBqId: builder.query({
      query: (bqId) => `/bq?bqId=${bqId}`,
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["Cost Tracking"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllBqQuery,
  useGetBqByProjectIdQuery,
  useGetBqByBqIdQuery,
} = costTrackingApi;
