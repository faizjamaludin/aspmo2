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
      query: () => `/bqs`,
      transformResponse: (response, meta, arg) => {
        const res = response.data;

        console.log(res);
        var projectId = arg;

        res.map((item, index) => {
          const bqProjectId = item.items.filter(
            (data) => data.projectId == projectId
          );

          // console.log(bqProjectId);
        });

        // const bqData = response.data.filter((bq) => console.log(bq.items));
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
