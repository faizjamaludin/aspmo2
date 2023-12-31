import React, { useState, useEffect } from "react";
import { Sidebar } from "../../component";
import { DataTable, projectColumn } from "../../helper";
import { useGetAllProjectQuery } from "../../features/api/projectApi";
import Popover from "@mui/material/Popover";

// component
import { AddProject } from "../../component";

// icon
import { BiPlus } from "react-icons/bi";

function Projects() {
  const { data: project = [], error, isLoading } = useGetAllProjectQuery();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <section className="mt-10 mr-10 ">
          <div className="flex flex-row justify-between mb-3">
            <div className="flex flex-row gap-x-2">
              <button
                className="flex flex-row items-center w-fit px-2 py-1 gap-x-2 rounded-sm bg-gray-100 hover:bg-purple-100 duration-300"
                onClick={handleClick}
              >
                <BiPlus /> <p className="text-p">Create</p>
              </button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <AddProject />
              </Popover>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search Project"
                className="border rounded-sm px-2 py-1 text-p w-[15rem]"
              />
            </div>
          </div>
          <div className="border rounded-md">
            <DataTable data={project} columns={projectColumn} pagination />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Projects;
