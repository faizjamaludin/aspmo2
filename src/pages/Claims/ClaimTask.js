import React, { useState, useEffect } from "react";
import {
  DataTable,
  useClaimTaskColumn,
  ClaimExpandedComponent,
} from "../../helper";
import { useParams } from "react-router-dom";
import { useGetTaskByProjectIdQuery } from "../../features/api/taskApi";
import Popover from "@mui/material/Popover";

// component
import { Sidebar, AddTask } from "../../component";

// icon
import { BiPlus } from "react-icons/bi";
import { MdDownload } from "react-icons/md";

function ClaimTask() {
  const { projectId } = useParams();
  const {
    data: task = [],
    error,
    isLoading,
  } = useGetTaskByProjectIdQuery(projectId);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const claimTaskColumn = useClaimTaskColumn();

  useEffect(() => {}, [task]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <section className=" mr-10">
      <div className="flex flex-row justify-end mb-3">
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
          data={task}
          columns={claimTaskColumn}
          expandableRows
          expandableRowDisabled={(row) => (row.childTask ? false : true)}
          expandOnRowClicked
          // expandableRowsHideExpander
          expandableRowsComponent={ClaimExpandedComponent}
          pagination
        />
      </div>
    </section>
  );
}

export default ClaimTask;
