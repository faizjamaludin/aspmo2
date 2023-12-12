import React, { useState } from "react";
import { DataTable, projectTaskColumn, ExpandedComponent } from "../../helper";
import { useParams } from "react-router-dom";
import { useGetTaskByProjectIdQuery } from "../../features/api/taskApi";

// component
import { Sidebar, AddTask } from "../../component";

// icon
import { BiPlus } from "react-icons/bi";
import { MdDownload } from "react-icons/md";

function ProjectTask() {
  const { projectId } = useParams();
  const {
    data: task = [],
    error,
    isLoading,
  } = useGetTaskByProjectIdQuery(projectId);

  const [openAdd, setOpenAdd] = useState(false);

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
        <section className="mt-10 mr-10">
          <div className="flex flex-row justify-between mb-3">
            <div className="flex flex-row">
              <button
                className="flex flex-row items-center w-fit px-2 py-1 gap-x-2 rounded-sm hover:bg-purple-100"
                onClick={() => setOpenAdd(true)}
              >
                <BiPlus /> <p className="text-[0.75rem]">Create</p>
              </button>
              <button className="flex flex-row items-center w-fit px-2 py-1 gap-x-2 rounded-sm hover:bg-purple-100">
                <MdDownload />
                <p className="text-[0.75rem]">Download</p>
              </button>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search Task"
                className="border rounded-sm px-2 py-1 text-h2 w-[15rem]"
              />
            </div>
          </div>
          <div className="border rounded-md">
            <DataTable
              data={task}
              columns={projectTaskColumn}
              expandableRows
              expandableRowDisabled={(row) => (row.childTask ? false : true)}
              expandOnRowClicked
              // expandableRowsHideExpander
              expandableRowsComponent={ExpandedComponent}
              pagination
            />
          </div>

          {/* Modal here */}
          <AddTask open={openAdd} close={!openAdd} />
        </section>
      </main>
    </div>
  );
}

export default ProjectTask;
