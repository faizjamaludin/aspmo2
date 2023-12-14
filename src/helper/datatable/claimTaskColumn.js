import React, { useState } from "react";
import dateFormat from "dateformat";
import { TaskDetail } from "../../component";
import Popover from "@mui/material/Popover";
import { useDeleteTaskMutation } from "../../features/api/taskApi";

// icon
import { HiBars3BottomLeft } from "react-icons/hi2";
import {
  BiCalendarAlt,
  BiCalendar,
  BiAlarm,
  BiChart,
  BiCheckSquare,
  BiDotsHorizontalRounded,
  BiTrashAlt,
} from "react-icons/bi";

function NameCell({ row }) {
  const [openModal, setOpenModal] = useState(false);

  const handleRowClick = (rowData) => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <div className="">
      <button
        onClick={handleRowClick}
        className="text-p text-start font-medium hover:text-purple-200"
      >
        {row.taskName}
      </button>
      {openModal && (
        <TaskDetail
          selectedData={row}
          open={openModal}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
}

function OptionCell({ taskId }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteTask, { isLoading, isSuccess }] = useDeleteTaskMutation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    await deleteTask(taskId);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <button onClick={handleClick}>
        <BiDotsHorizontalRounded size={17} />
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
        <div className="flex flex-col">
          <button
            type="button"
            onClick={handleDelete}
            className="flex flex-row justify-center items-center gap-x-2 duration-300 hover:bg-gray-200 p-3 text-red-300 cursor-pointer"
          >
            <BiTrashAlt size={17} /> <p className="text-p ">Delete</p>
          </button>
        </div>
      </Popover>
    </div>
  );
}

export const ClaimExpandedComponent = ({ data }) => {
  return (
    <div>
      {data.childTask?.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-row w-full border-b border-gray-200 h-[2.5rem] items-center text-[0.75rem] bg-gray-100 pl-[3rem]"
          >
            <div className="px-[1rem] w-[20rem]">
              <a href="" className="hover:text-purple-200">
                {item.taskName}
              </a>
            </div>
            {/* entitled percentage */}
            <div className="px-[1rem] w-[10rem] ">
              <p className="text-center">
                {item.entitledPercentage == null
                  ? "0"
                  : item.entitledPercentage}
              </p>
            </div>
            {/* awarded amount */}
            <div className="px-[1rem] w-[10rem]">
              {" "}
              <p className="text-center">
                {item.awardedAmount == null ? "0" : item.awardedAmount}
              </p>
            </div>
            {/* outstanding claim */}
            <div className="px-[1rem] w-[8rem]">
              <p className="text-center">{item.outstandingClaim}</p>
            </div>
            {/* actual claimed (RM) */}
            <div className="px-[1rem] w-[8rem]">
              <p className="text-center"></p>
            </div>
            {/* actual claimed (%) */}
            <div className="px-[1rem] w-[10rem] ">
              <p className="text-center"></p>
            </div>
            {/* day elapsed */}
            <div className="px-[1rem] w-[8rem]">
              <p className="text-center">{item.dayElapsed}</p>
            </div>

            {/* <div className="px-[1rem] w-[3rem]">
              <OptionCell taskId={item.taskId} />
            </div> */}
          </div>
        );
      })}
    </div>
  );
};

export const useClaimTaskColumn = () => {
  const claimTaskColumn = [
    {
      name: (
        <span className="flex flex-row justify-center items-center gap-x-2">
          <HiBars3BottomLeft />
          Task Name
        </span>
      ),
      selector: (row) => row.taskName,
      cell: (row) => <NameCell row={row} />,
      sortable: true,
      width: "20rem",
    },
    {
      name: (
        <span className="flex flex-row justify-center items-start gap-x-2">
          <BiChart size="1.7rem" />
          Entitled Percentage
        </span>
      ),
      selector: (row) => row.turnaroundDays,
      cell: (row) => console.log(row),
      cell: (row) =>
        row.entitledPercentage == null ? "0" : row.entitledPercentage,
      center: true,
      sortable: true,
      width: "10rem",
    },
    {
      name: (
        <span className="flex flex-row justify-center items-start gap-x-2">
          <BiCheckSquare size="2.1rem" />
          Awarded Amount
        </span>
      ),
      selector: (row) => (row.awardedAmount == null ? "0" : row.awardedAmount),
      center: true,
      sortable: true,
      width: "10rem",
    },
    {
      name: (
        <span className="flex flex-row justify-center items-start gap-x-2">
          <BiCalendarAlt size="1.4rem" />
          Outstanding Claim
        </span>
      ),
      selector: (row) => row.plannedStartDate,
      cell: (row) => row.outstandingClaim,
      width: "8rem",
      sortable: true,
      center: true,
    },
    {
      name: (
        <span className="flex flex-row justify-center items-start gap-x-2">
          <BiCalendar size="1.3rem" />
          Actual Claimed (RM)
        </span>
      ),
      selector: (row) => row.actualClaim,
      width: "8rem",
      sortable: true,
      center: true,
    },
    {
      name: (
        <span className="flex flex-row justify-center items-start gap-x-2">
          <BiAlarm size="1.9rem" />
          Actual Claimed (%)
        </span>
      ),
      selector: (row) => row.actualClaim,
      center: true,
      sortable: true,
      width: "10rem",
    },
    {
      name: (
        <span className="flex flex-row justify-center items-start gap-x-2">
          <BiCalendarAlt size="1.3rem" />
          Day Elapsed (days)
        </span>
      ),
      selector: (row) => row.dayElapsed,
      center: true,
      sortable: true,
      width: "8rem",
    },
    // {
    //   name: "",
    //   selector: (row) => row.taskId,
    //   cell: (row) => <OptionCell taskId={row.taskId} />,
    //   sortable: true,
    //   width: "3rem",
    // },
  ];

  return claimTaskColumn;
};
