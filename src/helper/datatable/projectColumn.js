import dateFormat from "dateformat";

// icon
import { HiBars3BottomLeft } from "react-icons/hi2";
import { BiHourglass } from "react-icons/bi";
import { BiCalendarAlt } from "react-icons/bi";
import { BiCalendar } from "react-icons/bi";
import { BiAlarm } from "react-icons/bi";
import { BiFace } from "react-icons/bi";

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
        <HiBars3BottomLeft />
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
        <BiHourglass />
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
      <span className="flex flex-row justify-center items-center gap-x-2">
        <BiCalendarAlt size="0.8rem" />
        Plan Start
      </span>
    ),
    selector: (row) => dateFormat(row.startDate, "dd-mmm-yy"),
    sortable: true,
    center: true,
    width: "8rem",
  },
  {
    name: (
      <span className="flex flex-row justify-center items-center gap-x-2">
        <BiCalendar size="0.8rem" />
        Plan End
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
