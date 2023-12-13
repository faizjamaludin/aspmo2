import React, { useMemo } from "react";
import { HiBars3BottomLeft } from "react-icons/hi2";
import dateFormat from "dateformat";

function HandleDate({ date }) {
  return dateFormat(date, "dd-mmm-yy");
}

export const submissionColumn = useMemo(() => [
  {
    name: (
      <span className="flex flex-row justify-center items-center gap-x-2">
        <HiBars3BottomLeft />
        File Name
      </span>
    ),
    selector: (row) => row.taskName,
    sortable: true,
    width: "20rem",
  },
  {
    name: (
      <span className="flex flex-row justify-center items-center gap-x-2">
        <HiBars3BottomLeft />
        Drawing Ref No.
      </span>
    ),
    selector: (row) => row.drawingRefNo,
    cell: (row) => (row.drawingRefNo == null ? "-" : row.drawingRefNo),
    center: true,
    sortable: true,
  },
  {
    name: (
      <span className="flex flex-row justify-center items-center gap-x-2">
        <HiBars3BottomLeft />
        Code
      </span>
    ),
    selector: (row) => row.code,
    center: true,
    sortable: true,
  },
  {
    name: (
      <span className="flex flex-row justify-center items-center gap-x-2">
        <HiBars3BottomLeft />
        Submission Date
      </span>
    ),
    selector: (row) => row.submissionDate,
    cell: (row) => <HandleDate date={row.submissionDate} />,
    center: true,
    sortable: true,
  },
  {
    name: (
      <span className="flex flex-row justify-center items-center gap-x-2">
        <HiBars3BottomLeft />
        Response Date
      </span>
    ),
    selector: (row) => row.responseDate,
    cell: (row) => <HandleDate date={row.responseDate} />,
    center: true,
    sortable: true,
  },
  {
    name: (
      <span className="flex flex-row justify-center items-center gap-x-2">
        <HiBars3BottomLeft />
        Turnaround Days
      </span>
    ),
    selector: (row) => row.turnaroundDays,
    center: true,
    sortable: true,
  },
  {
    name: (
      <span className="flex flex-row justify-center items-center gap-x-2">
        <HiBars3BottomLeft />
        Submitted By
      </span>
    ),
    selector: (row) => row.submittedBy,
    center: true,
    sortable: true,
  },
  {
    name: (
      <span className="flex flex-row justify-center items-center gap-x-2">
        <HiBars3BottomLeft />
        Comment
      </span>
    ),
    selector: (row) => row.comment,
    sortable: true,
  },
]);
