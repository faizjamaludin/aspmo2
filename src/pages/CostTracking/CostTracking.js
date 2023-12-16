import React, { useState, useEffect } from "react";
import {
  DataTable,
  useCostTracking,
  CostExpandedComponent,
} from "../../helper";
import { useParams } from "react-router-dom";
import { useGetBqByProjectIdQuery } from "../../features/api/costTrackingApi";
import Popover from "@mui/material/Popover";

// component
import { AddTask } from "../../component";

// icon
import { BiPlus } from "react-icons/bi";
import { MdDownload } from "react-icons/md";

function CostTracking() {
  const { projectId } = useParams();
  const costTrackingColumn = useCostTracking();

  const {
    data: costTracking = [],
    error,
    isLoading,
  } = useGetBqByProjectIdQuery(projectId);

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
    <section className="mr-10">
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
            <AddTask />
          </Popover>
          <button className="flex flex-row items-center w-fit px-2 py-1 gap-x-2 rounded-sm bg-gray-100 hover:bg-purple-100 duration-300">
            <MdDownload />
            <p className="text-p">Download</p>
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search Task"
            className="border rounded-sm px-2 py-1 text-p w-[15rem]"
          />
        </div>
      </div>
      <div className="border rounded-md">
        <DataTable
          data={costTracking}
          columns={costTrackingColumn}
          expandableRows
          expandableRowDisabled={(row) => (row.items ? false : true)}
          expandOnRowClicked
          // expandableRowsHideExpander
          expandableRowsComponent={CostExpandedComponent}
          pagination
        />
      </div>
    </section>
  );
}

export default CostTracking;
