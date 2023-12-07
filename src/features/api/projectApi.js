import { pmoApi } from "./pmoApi";

const projectApi = pmoApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProject: builder.query({
      query: () => `/projects`,
      transformResponse: (response) => {
        return response.data;
      },
    }),
    getProjectByProjectId: builder.query({
      query: (projectId) => `/project?projectId=${projectId}`,
      transformResponse: (response) => {
        return response.result.data;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllProjectQuery, useGetProjectByProjectIdQuery } =
  projectApi;
