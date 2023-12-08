import React from "react";
import { Sidebar } from "../../component";
import { DataTable, projectTaskColumn } from "../../helper";
import { useParams } from "react-router-dom";
import { useGetTaskByProjectIdQuery } from "../../features/api/taskApi";

function ProjectTask() {
  const { projectId } = useParams();
  const {
    data: task = [],
    error,
    isLoading,
  } = useGetTaskByProjectIdQuery(projectId);

  return (
    <div className="flex flex-row w-full">
      <nav className="w-[15rem] fixed">
        <Sidebar />
      </nav>
      <main
        className={`flex-1 min-h-screen ml-[15rem] bg-background md:w-[71rem] p-[1.5rem] duration-500 ease-in-out `}
      >
        <header className="flex flex-row items-start justify-start gap-x-2">
          <img src="/img/icon/task.png" alt="" className="w-[2rem] h-[2rem]" />
          <div className="flex flex-col ">
            <h1 className="text-h1 font-medium text-blue-300 ">Task</h1>
            <p className="text-h2 text-gray-300">View and manage your task</p>
          </div>
        </header>
        <section className="mt-10 mr-10 border rounded-md">
          <DataTable data={task} columns={projectTaskColumn} pagination />
        </section>
      </main>
    </div>
  );
}

export default ProjectTask;
