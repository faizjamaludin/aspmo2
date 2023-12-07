import { pmoApi } from "./pmoApi";

const taskApi = pmoApi.injectEndpoints({
  endpoints: (builder) => ({
    getTaskByProjectId: builder.query({
      query: (projectId) => `/tasks?projectId=${projectId}`,
      transformResponse: (response) => {
        return response.data;
      },
    }),
    getTaskByTaskId: builder.query({
      query: (taskId) => `/task?taskId=${taskId}`,
      transformResponse: (response) => {
        return response.data;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetTaskByProjectIdQuery, useGetTaskByTaskIdQuery } = taskApi;
