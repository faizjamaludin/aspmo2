import dateFormat from "dateformat";

// icon
import { HiBars3BottomLeft } from "react-icons/hi2";

function NameCell({ row }) {
  console.log(row);
  return (
    <a
      href={`/project/task/${row.projectId}`}
      className="text-h2 font-medium hover:text-purple-200"
    >
      {row.taskName}
    </a>
  );
}

export const projectTaskColumn = [
  {
    name: (
      <span className="flex flex-row justify-center items-center gap-x-2">
        <HiBars3BottomLeft />
        Project Name
      </span>
    ),
    selector: (row) => row.taskName,
    cell: (row) => <NameCell row={row} />,
    sortable: true,
    width: "20rem",
  },
  {
    name: "Actual Turnaround Days",
    selector: (row) => row.projectName,
    sortable: true,
  },
  {
    name: "Actual Total Turnaround Days",
    selector: (row) => row.projectName,
    sortable: true,
  },
  {
    name: "Proposed Start Date",
    selector: (row) => row.projectName,
    sortable: true,
  },
  {
    name: "Proposed End Date",
    selector: (row) => row.projectName,
    sortable: true,
  },
  {
    name: "Proposed Duration (days)",
    selector: (row) => row.projectName,
    sortable: true,
  },
  {
    name: "Actual Start",
    selector: (row) => row.projectName,
    sortable: true,
  },
  {
    name: "Actual End",
    selector: (row) => row.projectName,
    sortable: true,
  },
  {
    name: "Actual Duration (days)",
    selector: (row) => row.projectName,
    sortable: true,
  },
  {
    name: "Day Elapsed",
    selector: (row) => row.projectName,
    sortable: true,
  },
  {
    name: "Asignee",
    selector: (row) => row.projectName,
    sortable: true,
  },
  {
    name: "Actual Turnaround Days",
    selector: (row) => row.projectName,
    sortable: true,
  },
];
