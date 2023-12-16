import React, { useState } from "react";
import dateFormat from "dateformat";
import Popover from "@mui/material/Popover";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

// icon
import { HiBars3BottomLeft } from "react-icons/hi2";
import {
  BiHourglass,
  BiCalendarAlt,
  BiCalendar,
  BiAlarm,
  BiFace,
  BiDotsHorizontalRounded,
  BiTrashAlt,
} from "react-icons/bi";
import { useDeleteProjectMutation } from "../../features/api/projectApi";

function NameCell({ row }) {
  return (
    <a
      href={`/project/${row.projectId}`}
      className="text-p font-medium hover:text-purple-200"
    >
      {row.projectName}
    </a>
  );
}

export const CostExpandedComponent = ({ data }) => {
  console.log(data.items);

  return (
    <div>
      {data.items.map((item, index) => (
        <div
          key={index}
          className="flex flex-row w-full border-b border-gray-200 min-h-[2.5rem] items-center text-[0.75rem] bg-gray-100 pl-[3rem]"
        >
          {/* description */}
          <div className="px-[1rem] w-[20rem]">
            <a href="" className="hover:text-purple-200">
              {item.description}
            </a>
          </div>
          {/* unit */}
          <div className="px-[1rem] w-[7rem] ">
            <p className="text-center">{item.unit}</p>
          </div>
          {/* quantity */}
          <div className="px-[1rem] w-[7rem] ">
            <p className="text-center">
              {item.quantity == null ? "0" : item.quantity}
            </p>
          </div>
          {/* unit rate */}
          <div className="px-[1rem] w-[10rem] ">
            <p className="text-center">
              {item.unitRate == null ? "0.00" : item.unitRate}
            </p>
          </div>
          {/* total cost */}
          <div className="px-[1rem] w-[10rem] ">
            <p className="text-center">
              {item.totalCost == null ? "0.00" : item.totalCost}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const useCostTracking = () => {
  const costTrackingColumn = [
    {
      name: (
        <span className="flex flex-row justify-center items-center gap-x-2">
          <HiBars3BottomLeft size="0.8rem" />
          Title
        </span>
      ),
      selector: (row) => row.title,
      sortable: true,
      width: "20rem",
    },
    {
      name: (
        <span className="flex flex-row justify-center items-center gap-x-2">
          <HiBars3BottomLeft size="0.8rem" />
          Unit
        </span>
      ),
      selector: (row) => row.title,
      cell: (row) => "",
      sortable: true,
      width: "7rem",
    },
    {
      name: (
        <span className="flex flex-row justify-center items-center gap-x-2">
          <HiBars3BottomLeft size="0.8rem" />
          Quantity
        </span>
      ),
      selector: (row) => row.title,
      cell: (row) => "",
      sortable: true,
      width: "7rem",
    },
    {
      name: (
        <span className="flex flex-row justify-center items-center gap-x-2">
          <HiBars3BottomLeft size="0.8rem" />
          Unit Rate (RM)
        </span>
      ),
      selector: (row) => row.title,
      cell: (row) => "",
      sortable: true,
      width: "10rem",
    },
    {
      name: (
        <span className="flex flex-row justify-center items-center gap-x-2">
          <HiBars3BottomLeft size="0.8rem" />
          Total Cost
        </span>
      ),
      selector: (row) => row.title,
      cell: (row) => "",
      width: "10rem",
      sortable: true,
    },
  ];

  return costTrackingColumn;
};
