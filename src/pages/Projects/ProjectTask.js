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

  console.log(task);

  return (
    <div className="flex flex-row w-full">
      <nav className="w-[15rem] fixed">
        <Sidebar />
      </nav>
      <main
        className={`flex-1 min-h-screen ml-[15rem] bg-background md:w-[71rem] p-[1.5rem] duration-500 ease-in-out `}
      >
        <header className=" flex flex-col justify-center">
          <div className="flex flex-row gap-x-2">
            <img
              src="/img/icon/project.png"
              alt=""
              className="w-[2rem] h-[2rem]"
            />
            <h1 className="text-h1 font-medium text-blue-300">Task</h1>
          </div>
          <p className="text-h2 text-gray-300">View and manage your task</p>
        </header>
        <section className="mt-10">
          <DataTable data={task} columns={projectTaskColumn} pagination />
        </section>
      </main>
    </div>
  );
}

export default ProjectTask;
