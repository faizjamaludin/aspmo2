import { pmoApi } from "./pmoApi";

const taskApi = pmoApi.injectEndpoints({
  tagTypes: ["Task"],
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
      providesTags: ["Task"],
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: `/tasks`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `tasks?taskId=${taskId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTaskByProjectIdQuery,
  useGetTaskByTaskIdQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
