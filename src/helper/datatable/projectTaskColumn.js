import React, { useState } from "react";
import dateFormat from "dateformat";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { TaskDetail } from "../../component";
import Popover from "@mui/material/Popover";
import { useDeleteTaskMutation } from "../../features/api/taskApi";

// icon
import { HiBars3BottomLeft } from "react-icons/hi2";
import {
  BiCalendarAlt,
  BiCalendar,
  BiAlarm,
  BiAlarmExclamation,
  BiCalendarEdit,
  BiFace,
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

function DayDiff({ startDate, endDate }) {
  const start = startDate == null ? 0 : new Date(startDate);
  const end = endDate == null ? 0 : new Date(endDate);
  const timeDiff = end - start;
  const daysDiff = timeDiff / (1000 * 3600 * 24);

  return <p>{daysDiff + 1}</p>;
}

function StartEndDate({ date }) {
  if (date == null) {
    return "-";
  } else {
    return dateFormat(date, "dd-mmm-yy");
  }
}

function AsigneeCell({ asignee }) {
  return (
    <AvatarGroup max={4}>
      <Tooltip title={asignee}>
        <Avatar
          alt={asignee}
          sx={{
            width: "1.5rem",
            height: "1.5rem",
            borderColor: "#000000",
            borderWidth: "1px",
          }}
        />
      </Tooltip>
    </AvatarGroup>
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

export const ProjectExpandedComponent = ({ data }) => {
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
            <div className="px-[1rem] w-[10rem] ">
              <p className="text-center">
                {item.turnaroundDays == null ? "0" : item.turnaroundDays}
              </p>
            </div>
            <div className="px-[1rem] w-[10rem]">
              {" "}
              <p className="text-center">
                {item.totalTurnaroundDays == null
                  ? "0"
                  : item.totalTurnaroundDays}
              </p>
            </div>
            <div className="px-[1rem] w-[8rem]">
              <p className="text-center">
                {item.plannedStartDate == null
                  ? "-"
                  : dateFormat(item.plannedStartDate, "dd-mmm-yy")}
              </p>
            </div>
            <div className="px-[1rem] w-[8rem]">
              <p className="text-center">
                {item.plannedEndDate == null
                  ? "-"
                  : dateFormat(item.plannedEndDate, "dd-mmm-yy")}
              </p>
            </div>
            <div className="px-[1rem] w-[10rem] ">
              <p className="text-center">
                {
                  <DayDiff
                    startDate={item.plannedStartDate}
                    endDate={item.plannedEndDate}
                  />
                }
              </p>
            </div>
            <div className="px-[1rem] w-[8rem]">
              <p className="text-center">
                {item.startDate == null
                  ? "-"
                  : dateFormat(item.startDate, "dd-mmm-yy")}
              </p>
            </div>
            <div className="px-[1rem] w-[8rem]">
              <p className="text-center">
                {item.endDate == null
                  ? "-"
                  : dateFormat(item.endDate, "dd-mmm-yy")}
              </p>
            </div>
            <div className="px-[1rem] w-[10rem]">
              <p className="text-center">
                {<DayDiff startDate={item.startDate} endDate={item.endDate} />}
              </p>
            </div>
            <div className="px-[1rem] w-[8rem]">
              <p className="text-center">{item.dayElapsed}</p>
            </div>
            <div className="px-[1rem] w-[8rem]">
              <p className="flex items-start">
                <AsigneeCell asignee={item.reporter} />
              </p>
            </div>
            <div className="px-[1rem] w-[3rem]">
              <OptionCell taskId={item.taskId} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const projectTaskColumn = [
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
        Actual Turnaround Days
      </span>
    ),
    selector: (row) => row.turnaroundDays,
    cell: (row) => (row.turnaroundDays == null ? "-" : row.turnaroundDays),
    center: true,
    sortable: true,
    width: "10rem",
  },
  {
    name: (
      <span className="flex flex-row justify-center items-start gap-x-2">
        <BiCheckSquare size="2.1rem" />
        Actual Total Turnaround Days
      </span>
    ),
    selector: (row) => row.totalTurnaroundDays,
    cell: (row) =>
      row.totalTurnaroundDays == null ? "-" : row.totalTurnaroundDays,
    center: true,
    sortable: true,
    width: "10rem",
  },
  {
    name: (
      <span className="flex flex-row justify-center items-start gap-x-2">
        <BiCalendarAlt size="1.4rem" />
        Proposed Start
      </span>
    ),
    selector: (row) => row.plannedStartDate,
    cell: (row) => <StartEndDate date={row.plannedStartDate} />,
    width: "8rem",
    sortable: true,
    center: true,
  },
  {
    name: (
      <span className="flex flex-row justify-center items-start gap-x-2">
        <BiCalendar size="1.3rem" />
        Proposed End
      </span>
    ),
    selector: (row) => row.plannedEndDate,
    cell: (row) => <StartEndDate date={row.plannedEndDate} />,
    width: "8rem",
    sortable: true,
    center: true,
  },
  {
    name: (
      <span className="flex flex-row justify-center items-start gap-x-2">
        <BiAlarm size="1.9rem" />
        Proposed Duration (days)
      </span>
    ),
    selector: (row) => row.plannedEndDate,
    cell: (row) => (
      <DayDiff startDate={row.plannedStartDate} endDate={row.plannedEndDate} />
    ),
    center: true,
    sortable: true,
    width: "10rem",
  },
  {
    name: (
      <span className="flex flex-row justify-center items-start gap-x-2">
        <BiCalendarAlt size="1.3rem" />
        Actual Start
      </span>
    ),
    selector: (row) => <StartEndDate date={row.startDate} />,
    center: true,
    sortable: true,
    width: "8rem",
  },
  {
    name: (
      <span className="flex flex-row justify-center items-start gap-x-2">
        <BiCalendar size="1.3rem" />
        Actual End
      </span>
    ),
    selector: (row) => <StartEndDate date={row.endDate} />,
    center: true,
    sortable: true,
    width: "8rem",
  },
  {
    name: (
      <span className="flex flex-row justify-center items-start gap-x-2">
        <BiAlarmExclamation size="1.7rem" />
        Actual Duration (days)
      </span>
    ),
    selector: (row) => (
      <DayDiff startDate={row.startDate} endDate={row.endDate} />
    ),
    sortable: true,
    center: true,
    width: "10rem",
  },
  {
    name: (
      <span className="flex flex-row justify-center items-start gap-x-2">
        <BiCalendarEdit size="1.4rem" />
        Day Elapsed
      </span>
    ),
    selector: (row) => row.dayElapsed,
    center: true,
    sortable: true,
    width: "8rem",
  },
  {
    name: (
      <span className="flex flex-row justify-center items-center gap-x-2">
        <BiFace size="1rem" />
        Asignee
      </span>
    ),
    selector: (row) => row.reporter,
    cell: (row) => <AsigneeCell asignee={row.reporter} />,
    width: "8rem",
    sortable: true,
  },
  {
    name: "",
    selector: (row) => row.taskId,
    cell: (row) => <OptionCell taskId={row.taskId} />,
    sortable: true,
    width: "3rem",
  },
];
