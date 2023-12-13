import React from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useAddTaskMutation } from "../../features/api/taskApi";

function AddTask({ parentTaskId, reporter }) {
  const { projectId } = useParams();
  const [addTask, { isLoading }] = useAddTaskMutation();

  const formik = useFormik({
    initialValues: {
      projectId: projectId,
      parentTaskId: parentTaskId ? parentTaskId : "",
      taskName: "",
      plannedStartDate: "",
      plannedEndDate: "",
      reporter: 1,
      assignee: [1],
    },
    onSubmit: async (values) => {
      if (values.parentTaskId === "") {
        const data = {
          projectId: projectId,
          taskName: values.taskName,
          plannedStartDate: values.plannedStartDate,
          plannedEndDate: values.plannedEndDate,
          reporter: values.reporter,
          assignee: values.assignee,
        };
        await addTask(data);
      }

      if (values.parentTaskId !== "") {
        console.log(values);

        await addTask(values);
      }
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-row p-4 border rounded-md gap-x-2"
    >
      <div className="flex flex-col">
        <label className="text-p font-medium">Task Name</label>
        <input
          type="text"
          name="taskName"
          onChange={formik.handleChange}
          className="border rounded-sm outline-0 px-2 py-1 text-p w-[20rem]"
          placeholder="Task Name"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-p font-medium">Start Date</label>
        <input
          type="date"
          name="plannedStartDate"
          onChange={formik.handleChange}
          className="border rounded-sm outline-0 px-2 py-1 text-p"
          placeholder="Task Name"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-p font-medium">End Date</label>
        <input
          type="date"
          name="plannedEndDate"
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

export default AddTask;
