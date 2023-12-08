import dateFormat from "dateformat";

// icon
import { HiBars3BottomLeft } from "react-icons/hi2";
import {
  BiHourglass,
  BiCalendarAlt,
  BiCalendar,
  BiAlarm,
  BiAlarmExclamation,
  BiCalendarEdit,
  BiFace,
  BiChart,
  BiCheckSquare,
} from "react-icons/bi";

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

function DayDiff({ startDate, endDate }) {
  const start = startDate == null ? 0 : new Date(startDate);
  const end = endDate == null ? 0 : new Date(endDate);

  console.log(end);
  const timeDiff = end - start;
  const daysDiff = timeDiff / (1000 * 3600 * 24);

  return <p>{daysDiff}</p>;
}

function StartEndDate({ date }) {
  if (date == null) {
    return "-";
  } else {
    return dateFormat(date, "dd-mmm-yy");
  }
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
    name: (
      <span className="flex flex-row justify-center items-start gap-x-2">
        <BiChart size="1.7rem" />
        Actual Turnaround Days
      </span>
    ),
    selector: (row) => row.turnaroundDays,
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
    sortable: true,
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
    sortable: true,
  },
  {
    name: (
      <span className="flex flex-row justify-center items-start gap-x-2">
        <BiAlarm size="1.9rem" />
        Proposed Duration (days)
      </span>
    ),
    selector: (row) => row.taskId,
    cell: (row) => (
      <DayDiff startDate={row.plannedStartDate} endDate={row.plannedEndDate} />
    ),
    center: true,
    sortable: true,
    width: "10rem",
  },
  {
    name: (
      <span className="flex flex-row justify-center items-center gap-x-2">
        <BiCalendarAlt size="1.3rem" />
        Actual Start
      </span>
    ),
    selector: (row) => <StartEndDate date={row.startDate} />,
    center: true,
    sortable: true,
  },
  {
    name: (
      <span className="flex flex-row justify-center items-center gap-x-2">
        <BiCalendar size="1.3rem" />
        Actual End
      </span>
    ),
    selector: (row) => <StartEndDate date={row.endDate} />,
    center: true,
    sortable: true,
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
  },
  {
    name: (
      <span className="flex flex-row justify-center items-center gap-x-2">
        <BiFace size="1rem" />
        Asignee
      </span>
    ),
    selector: (row) => row.projectName,
    sortable: true,
  },
  {
    name: "Remark",
    selector: (row) => row.projectName,
    sortable: true,
  },
];
