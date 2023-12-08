import dateFormat from "dateformat";

// icon
import { HiBars3BottomLeft } from "react-icons/hi2";
import {
  BiHourglass,
  BiCalendarAlt,
  BiCalendar,
  BiAlarm,
  BiFace,
} from "react-icons/bi";

function NameCell({ row }) {
  console.log(row);
  return (
    <a
      href={`/project/task/${row.projectId}`}
      className="text-h2 font-medium hover:text-purple-200"
    >
      {row.projectName}
    </a>
  );
}

function Creator({ creator }) {
  var newName = creator
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return newName;
}

function Status({ status }) {
  return (
    <span
      className={`text-h3 font-semibold px-3 rounded-full ${
        status == "To do"
          ? "bg-gray-200"
          : status == "Completed"
          ? "bg-green-100 text-bg-green-200"
          : status == "In progress"
          ? "bg-blue-100 text-blue-200"
          : null
      } `}
    >
      {status}
    </span>
  );
}

export const projectColumn = [
  {
    name: (
      <span className="flex flex-row justify-center items-center gap-x-2">
        <HiBars3BottomLeft size="0.8rem" />
        Project Name
      </span>
    ),
    selector: (row) => row.projectName,
    cell: (row) => <NameCell row={row} />,
    sortable: true,
    width: "20rem",
  },
  {
    name: (
      <span className="flex flex-row justify-center items-center gap-x-2">
        <BiHourglass size="0.8rem" />
        Status
      </span>
    ),
    selector: (row) => row.status,
    cell: (row) => <Status status={row.status} />,
    sortable: true,
    center: true,
    width: "8rem",
  },
  {
    name: (
      <span className="flex flex-row justify-center items-start gap-x-2">
        <BiCalendarAlt size="1.2rem" />
        Proposed Start
      </span>
    ),
    selector: (row) => dateFormat(row.startDate, "dd-mmm-yy"),
    sortable: true,
    center: true,
    width: "8rem",
  },
  {
    name: (
      <span className="flex flex-row justify-center items-start gap-x-2">
        <BiCalendar size="1.2rem" />
        Proposed End
      </span>
    ),
    selector: (row) => dateFormat(row.endDate, "dd-mmm-yy"),
    sortable: true,
    center: true,
    width: "8rem",
  },
  {
    name: (
      <span className="flex flex-row justify-center items-start gap-x-2">
        <BiCalendarAlt size="1rem" />
        Actual Start
      </span>
    ),
    // selector: (row) => dateFormat(row.endDate, "dd-mmm-yy"),
    sortable: true,
    width: "8rem",
  },
  {
    name: (
      <span className="flex flex-row justify-center items-start gap-x-2">
        <BiCalendar size="1rem" />
        Actual End
      </span>
    ),
    // selector: (row) => dateFormat(row.endDate, "dd-mmm-yy"),
    sortable: true,
    width: "8rem",
  },
  {
    name: (
      <span className="flex flex-row justify-center items-start gap-x-2">
        <BiAlarm size="1.5rem" />
        Duration (days)
      </span>
    ),
    // selector: (row) => dateFormat(row.endDate, "dd-mmm-yy"),
    sortable: true,
    width: "8rem",
  },
  {
    name: (
      <span className="flex flex-row justify-center items-center gap-x-2">
        <BiFace size="0.9rem" />
        Creator
      </span>
    ),
    selector: (row) => row.creator,
    cell: (row) => <Creator creator={row.creator} />,
    sortable: true,
    width: "15rem",
  },
];
