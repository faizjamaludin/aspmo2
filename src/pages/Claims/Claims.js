import React, { useState, useEffect } from "react";
import { Sidebar } from "../../component";
import { DataTable, useClaimColumn } from "../../helper";
import { useGetAllProjectQuery } from "../../features/api/projectApi";

function Claims() {
  const { data: project = [], error, isLoading } = useGetAllProjectQuery();
  const claimColumn = useClaimColumn();

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
              src="/img/icon/claim.png"
              alt=""
              className="w-[2rem] h-[2rem]"
            />
            <h1 className="text-h1 font-medium text-blue-300">Claims</h1>
          </div>
          <p className="text-h2 text-gray-300">View and manage your claim</p>
        </header>
        <section className="mt-10 mr-10 ">
          <div className="flex flex-row justify-end mb-3">
            <div>
              <input
                type="text"
                placeholder="Search Project"
                className="border rounded-sm px-2 py-1 text-p w-[15rem]"
              />
            </div>
          </div>
          <div className="border rounded-md">
            <DataTable data={project} columns={claimColumn} pagination />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Claims;