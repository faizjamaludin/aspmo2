import React, { useState } from "react";
import dateFormat from "dateformat";
import Modal from "@mui/material/Modal";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";

// icon
import { MdClose } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import { GoPlus } from "react-icons/go";
import { BiDetail } from "react-icons/bi";

// component
import { DataTable, useSubmissionColumn } from "../../helper";
import { AddTask } from "../../component";

function SubTaskDetail({ selectedData, open, closeModal }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const submissionColumn = useSubmissionColumn();

  console.log(selectedData);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dayDif = ({ startDate, endDate }) => {};

  const openCreate = Boolean(anchorEl);
  const id = openCreate ? "simple-popover" : undefined;
  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-[80rem] h-[50rem] bg-white p-3 rounded-sm">
          <header className="h-[2rem] px-3 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-x-2">
              <img
                src="/img/icon/breadcrumb.png"
                alt=""
                className="w-[1.5rem] h-[1.5rem]"
              />
              <Breadcrumbs aria-label="breadcrumb">
                <button onClick={closeModal} className="text-p">
                  Parent Task
                </button>
                <span className="text-p font-medium">Sub Task</span>
              </Breadcrumbs>
            </div>
            <div>
              <button onClick={closeModal}>
                <MdClose size={20} />
              </button>
            </div>
          </header>
          <main className="px-3 mt-5 flex flex-row">
            <div className="flex flex-1">
              <div className="flex flex-col gap-y-2 w-[50rem]">
                <h1 className="text-h1 font-medium text-blue-300">
                  {selectedData.taskName}
                </h1>
                <div className="flex flex-row gap-x-2">
                  <button className="text-p flex flex-row gap-x-2 items-center bg-gray-100 hover:bg-gray-200 duration-300 px-2 py-1 rounded-sm">
                    <GrAttachment />
                    Submission
                  </button>
                </div>
                <div className="w-[50rem]">
                  <DataTable
                    columns={submissionColumn}
                    data={selectedData.submissions}
                    pagination
                  />
                </div>
              </div>
            </div>
            {/* details */}
            <div className="flex flex-col border rounded-sm w-[25rem]">
              <h1 className="text-h2 font-medium border-b px-4 py-2 flex flex-row items-center gap-x-2">
                <BiDetail size={17} />
                Details
              </h1>
              <div className="px-4 py-2 flex flex-col gap-y-4">
                <div className="flex flex-row items-center">
                  <label className="text-p font-medium w-[13rem]">
                    Actual Turnaround Days
                  </label>
                  <p className="text-p">
                    {selectedData.turnaroundDays == null
                      ? "0"
                      : selectedData.turnaroundDays}
                  </p>
                </div>
                <div className="flex flex-row items-center">
                  <label className="text-p font-medium w-[13rem]">
                    Actual Total Turnaround Days
                  </label>
                  <p className="text-p">
                    {selectedData.totalTurnaroundDays == null
                      ? "0"
                      : selectedData.totalTurnaroundDays}
                  </p>
                </div>
                <div className="flex flex-row items-center">
                  <label className="text-p font-medium w-[13rem]">
                    Proposed Start
                  </label>
                  <p className="text-p">
                    {dateFormat(selectedData.plannedStartDate, "dd-mmm-yy")}
                  </p>
                </div>
                <div className="flex flex-row items-center">
                  <label className="text-p font-medium w-[13rem]">
                    Proposed End
                  </label>
                  <p className="text-p">
                    {dateFormat(selectedData.plannedEndDate, "dd-mmm-yy")}
                  </p>
                </div>
                <div className="flex flex-row items-center">
                  <label className="text-p font-medium w-[13rem]">
                    Proposed Duration (days)
                  </label>
                  <p className="text-p"></p>
                </div>
                <div className="flex flex-row items-center">
                  <label className="text-p font-medium w-[13rem]">
                    Actual Start
                  </label>
                  <p className="text-p">
                    {dateFormat(selectedData.startDate, "dd-mmm-yy")}
                  </p>
                </div>
                <div className="flex flex-row items-center">
                  <label className="text-p font-medium w-[13rem]">
                    Actual Start
                  </label>
                  <p className="text-p">
                    {dateFormat(selectedData.endDate, "dd-mmm-yy")}
                  </p>
                </div>
                <div className="flex flex-row items-center">
                  <label className="text-p font-medium w-[13rem]">
                    Actual Duration (days)
                  </label>
                  <p className="text-p"></p>
                </div>
                <div className="flex flex-row items-center">
                  <label className="text-p font-medium w-[13rem]">
                    Day Elapsed
                  </label>
                  <p className="text-p">{selectedData.dayElapsed}</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Modal>
  );
}

export default SubTaskDetail;
