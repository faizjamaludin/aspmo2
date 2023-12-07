import React from "react";
import { Sidebar } from "../../component";
import { DataTable, projectColumn } from "../../helper";
import { useGetAllProjectQuery } from "../../features/api/projectApi";

function Projects() {
  const { data: project = [], error, isLoading } = useGetAllProjectQuery();

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
            <h1 className="text-h1 font-medium text-blue-300">Projects</h1>
          </div>
          <p className="text-h2 text-gray-300">View and manage your project</p>
        </header>
        <section className="mt-10">
          <DataTable data={project} columns={projectColumn} pagination />
        </section>
      </main>
    </div>
  );
}

export default Projects;
