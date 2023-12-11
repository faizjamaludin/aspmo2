import React, { useState, useEffect } from "react";
import { useGetTaskByProjectIdQuery } from "../features/api/taskApi";
import dateFormat from "dateformat";

import DataTable from "react-data-table-component";

const ExpandedComponent = ({ data }) => {
  return (
    <div>
      {data.childTask?.map((item, index) => {
        console.log(item);
        return (
          <div
            key={index}
            className="flex flex-row w-full border-b border-gray-200 h-[2.5rem] items-center pl-[2rem] text-[0.75rem]"
          >
            <p className="w-[20rem] ">{item.taskName}</p>
            <p className="w-[10rem]">{item.turnaroundDays}</p>
            <p className="w-[10rem]">{item.totalTurnaroundDays}</p>
            <p className="w-[8rem]">
              {dateFormat(item.plannedStartDate, "dd-mmm-yy")}
            </p>
            <p className="w-[8rem]">
              {dateFormat(item.plannedEndDate, "dd-mmm-yy")}
            </p>
            <p className="w-[10rem]">{}</p>
            <p className="w-[8rem]">
              {dateFormat(item.startDate, "dd-mmm-yy")}
            </p>
            <p className="w-[8rem]">{dateFormat(item.endDate, "dd-mmm-yy")}</p>
            <p className="w-[10rem]">{}</p>
            <p className="w-[8rem]">{item.dayElapsed}</p>
          </div>
        );
      })}
    </div>
  );
};

function TesPage() {
  const {
    data: projectData = [],
    error,
    isLoading,
  } = useGetTaskByProjectIdQuery(1);

  console.log(projectData.childTask?.length > 0);

  const columns = [
    {
      name: "Task Name",
      selector: (row) => row.taskName,
      cell: (row) => <a href="">{row.taskName}</a>,
      // cell: (row) => <TaskNameCell row={row} />,
      sortable: true,
      width: "20rem",
      wrap: true,
    },
    {
      name: "Actual Turnaround days",
      selector: (row) => row.turnaroundDays,
      // cell: (row) => (row.turnaroundDays == null ? "0" : row.turnaroundDays),
      sortable: true,
      center: true,
      wrap: true,
      width: "10rem",
    },
    {
      name: "Actual Total Turnaround days",
      selector: (row) => row.totalTurnaroundDays,
      // cell: (row) =>
      //   row.totalTurnaroundDays == null ? "0" : row.totalTurnaroundDays,
      sortable: true,
      center: true,
      wrap: true,
      width: "10rem",
    },
    {
      name: "Proposed Start Date",
      selector: (row) => dateFormat(row.plannedStartDate, "dd-mmm-yy"),
      sortable: true,
      center: true,
      width: "8rem",
    },
    {
      name: "Proposed End Date",
      selector: (row) => dateFormat(row.plannedEndDate, "dd-mmm-yy"),
      sortable: true,
      center: true,
      width: "8rem",
    },
    {
      name: "Proposed Duration (days)",
      selector: (row) => row.taskId,
      // cell: (row) => <DayDiff row={row} />,
      sortable: true,
      center: true,
      width: "10rem",
    },
    {
      name: "Actual Start",
      selector: (row) => dateFormat(row.startDate, "dd-mmm-yy"),
      sortable: true,
      width: "8rem",
    },
    {
      name: "Actual End",
      selector: (row) => dateFormat(row.endDate, "dd-mmm-yy"),
      sortable: true,
      width: "8rem",
    },
    {
      name: "Actual Duration (days)",
      selector: (row) => row.taskId,
      // cell: (row) => <ActualDayDiff row={row} />,
      sortable: true,
      center: true,
      width: "10rem",
    },
    {
      name: "Day Elapsed",
      selector: (row) => row.dayElapsed,
      sortable: true,
      center: true,
      width: "8rem",
    },
    {
      name: "Asignee",
      selector: (row) => row.asignee,
      // cell: (row) => console.log(row),
      sortable: true,
    },
    {
      name: "Remarks",
      selector: (row) => row.remark,
      sortable: true,
      width: "13rem",
      wrap: true,
    },
    {
      name: "",
      selector: (row) => row.taskId,
      // cell: (row) => <HandleDelete row={row} name="task" />,
      sortable: true,
      width: "4rem",
      wrap: true,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={projectData}
      expandableRows
      expandableRowDisabled={(row) => (row.childTask ? false : true)}
      expandOnRowClicked
      expandableRowsHideExpander
      expandableRowsComponent={ExpandedComponent}
      pagination
    />
  );
}

export default TesPage;
