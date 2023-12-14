import { pmoApi } from "./pmoApi";

const projectApi = pmoApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProject: builder.query({
      query: () => `/projects`,
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["Project"],
    }),
    getProjectByProjectId: builder.query({
      query: (projectId) => `/project?projectId=${projectId}`,
      transformResponse: (response) => {
        return response.result.data;
      },
    }),
    addProject: builder.mutation({
      query: (data) => ({
        url: `/project`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `/project?projectId=${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllProjectQuery,
  useGetProjectByProjectIdQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
