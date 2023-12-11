import React from "react";
import { Sidebar } from "../../component";
import { DataTable, projectTaskColumn } from "../../helper";
import { useParams } from "react-router-dom";
import { useGetTaskByProjectIdQuery } from "../../features/api/taskApi";
import dateFormat from "dateformat";

const DayDiff = ({ startDate, endDate }) => {
  const start = startDate == null ? 0 : new Date(startDate);
  const end = endDate == null ? 0 : new Date(endDate);

  console.log(end);
  const timeDiff = end - start;
  const daysDiff = timeDiff / (1000 * 3600 * 24);

  return <p>{daysDiff}</p>;
};

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
            <p className="w-[10rem] pl-[3.5rem]">
              {item.turnaroundDays == null ? "0" : item.turnaroundDays}
            </p>
            <p className="w-[10rem] pl-[3.5rem]">
              {item.totalTurnaroundDays == null
                ? "0"
                : item.totalTurnaroundDays}
            </p>
            <p className="w-[8rem]">
              {dateFormat(item.plannedStartDate, "dd-mmm-yy")}
            </p>
            <p className="w-[8rem]">
              {dateFormat(item.plannedEndDate, "dd-mmm-yy")}
            </p>
            <p className="w-[10rem] pl-[2.8rem]">
              {
                <DayDiff
                  startDate={item.plannedStartDate}
                  endDate={item.plannedEndDate}
                />
              }
            </p>
            <p className="w-[8rem]">
              {dateFormat(item.startDate, "dd-mmm-yy")}
            </p>
            <p className="w-[8rem]">{dateFormat(item.endDate, "dd-mmm-yy")}</p>
            <p className="w-[10rem] pl-[2rem]">
              {<DayDiff startDate={item.startDate} endDate={item.endDate} />}
            </p>
            <p className="w-[8rem] pl-[1rem]">{item.dayElapsed}</p>
          </div>
        );
      })}
    </div>
  );
};

function ProjectTask() {
  const { projectId } = useParams();
  const {
    data: task = [],
    error,
    isLoading,
  } = useGetTaskByProjectIdQuery(projectId);

  return (
    <div className="flex flex-row w-full">
      <nav className="w-[15rem] fixed">
        <Sidebar />
      </nav>
      <main
        className={`flex-1 min-h-screen ml-[15rem] bg-background md:w-[71rem] p-[1.5rem] duration-500 ease-in-out `}
      >
        <header className="flex flex-row items-start justify-start gap-x-2">
          <img src="/img/icon/task.png" alt="" className="w-[2rem] h-[2rem]" />
          <div className="flex flex-col ">
            <h1 className="text-h1 font-medium text-blue-300 ">Task</h1>
            <p className="text-h2 text-gray-300">View and manage your task</p>
          </div>
        </header>
        <section className="mt-10 mr-10 border rounded-md">
          <DataTable
            data={task}
            columns={projectTaskColumn}
            expandableRows
            expandableRowDisabled={(row) => (row.childTask ? false : true)}
            expandOnRowClicked
            expandableRowsHideExpander
            expandableRowsComponent={ExpandedComponent}
            pagination
          />
        </section>
      </main>
    </div>
  );
}

export default ProjectTask;
