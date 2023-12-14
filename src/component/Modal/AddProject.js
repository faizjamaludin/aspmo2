import React from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useAddProjectMutation } from "../../features/api/projectApi";

function AddProject() {
  const { projectId } = useParams();
  const [addProject, { isLoading, isSuccess }] = useAddProjectMutation();

  const formik = useFormik({
    initialValues: {
      projectName: "",
      projectOwner: 2,
      creator: 2,
      status: 1,
      description: "This is a sample project description.",
      startDate: "",
      endDate: "",
      projectLead: [1, 2],
    },
    onSubmit: async (values) => {
      console.log(values);
      addProject(values);

      if (isSuccess) {
        formik.resetForm();
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-row p-4 border rounded-md gap-x-2"
    >
      <div className="flex flex-col">
        <label className="text-p font-medium">Project Name</label>
        <input
          type="text"
          name="projectName"
          onChange={formik.handleChange}
          className="border rounded-sm outline-0 px-2 py-1 text-p w-[20rem]"
          placeholder="Project Name"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-p font-medium">Start Date</label>
        <input
          type="date"
          name="startDate"
          onChange={formik.handleChange}
          className="border rounded-sm outline-0 px-2 py-1 text-p"
          placeholder="Task Name"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-p font-medium">End Date</label>
        <input
          type="date"
          name="endDate"
          onChange={formik.handleChange}
          className="border rounded-sm outline-0 px-2 py-1 text-p"
          placeholder="Task Name"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-p font-medium">Assignee</label>
        <input
          type="text"
          className="border rounded-sm outline-0 px-2 py-1 text-p"
          placeholder="Assignee"
        />
      </div>
      <div className="flex justify-center items-end">
        <button
          type="submit"
          className="flex border px-2 py-1 w-fit h-fit rounded-md text-p duration-300 shadow-md hover:bg-purple-200 hover:text-white"
        >
          Create
        </button>
      </div>
    </form>
  );
}

export default AddProject;
