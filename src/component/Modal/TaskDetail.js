import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import Modal from "@mui/material/Modal";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";

// icon
import { MdClose } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import { GoPlus } from "react-icons/go";
import { BiDetail, BiCheck, BiX } from "react-icons/bi";

// component
import { DataTable, useSubmissionColumn } from "../../helper";
import { AddTask, SubTaskDetail } from "../../component";
import { useEditTaskMutation } from "../../features/api/taskApi";

function TaskDetail({ selectedData, open, closeModal }) {
  const { projectId } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const submissionColumn = useSubmissionColumn();
  const openCreate = Boolean(anchorEl);
  const [selectedItem, setSelectedItem] = useState(null);
  const [titleValue, setTitleValue] = useState(selectedData.taskName);
  const [isInput, setIsInput] = useState(false);
  const [editTask, { data, isLoading, isSuccess }] = useEditTaskMutation();

  useEffect(() => {}, [data, editTask, isSuccess]);

  const id = openCreate ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // modal
  const handleOpenModal = (item) => {
    setOpenModal(true);
    setSelectedItem(item); // S
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const formik = useFormik({
    initialValues: {
      taskId: selectedData.taskId,
      projectId: projectId,
      parentTaskId: null,
      taskName: titleValue,
      plannedStartDate: "2023-03-01",
      plannedEndDate: "2023-06-30",
      reporter: 1,
      assignee: [1],
      status: 1,
    },
    onSubmit: (values) => {
      editTask(values);
      console.log(data);
    },
  });

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
                <span className="text-p font-medium">Parent Task</span>
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
                {isInput ? (
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      type="text"
                      name="taskName"
                      value={formik.values.taskName}
                      onChange={formik.handleChange}
                      className="text-h1 font-medium text-blue-300 px-1 w-full"
                    />
                    <div className="flex justify-end gap-x-2 mt-2">
                      <button
                        onClick={() => setIsInput(false)}
                        className="p-2 bg-red-200 hover:bg-gray-200 text-red-300 rounded-sm duration-300"
                      >
                        <BiX size={20} />
                      </button>
                      <button
                        type="submit"
                        className="p-2 bg-green-100 hover:bg-gray-200 text-green-200 rounded-sm duration-300"
                      >
                        <BiCheck size={20} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <h1
                    onClick={() => setIsInput(true)}
                    className="text-h1 font-medium text-blue-300 hover:bg-gray-100 duration-300 px-1"
                  >
                    {selectedData.taskName}
                  </h1>
                )}
                <div className="flex flex-row gap-x-2">
                  <button
                    onClick={handleClick}
                    className="text-p flex flex-row gap-x-2 items-center bg-gray-100 hover:bg-gray-200 duration-300 px-2 py-1 rounded-sm"
                  >
                    <GoPlus />
                    Sub Task
                  </button>
                  <Popover
                    id={id}
                    open={openCreate}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <AddTask
                      parentTaskId={selectedData.taskId}
                      reporter={selectedData.reporter}
                    />
                  </Popover>
                  <button className="text-p flex flex-row gap-x-2 items-center bg-gray-100 hover:bg-gray-200 duration-300 px-2 py-1 rounded-sm">
                    <GrAttachment />
                    Submission
                  </button>
                </div>
                <div className="w-[50rem] mt-5">
                  <h1 className="text-h2 font-medium">Submission</h1>
                  <DataTable
                    columns={submissionColumn}
                    data={selectedData.submissions}
                  />
                </div>
                <Divider
                  variant="middle"
                  sx={{ margin: "10px 0", width: "50rem" }}
                />
                <div className="flex flex-col w-[45rem]">
                  <h1 className="text-h2 font-medium">Sub Task</h1>
                  <div className="flex flex-col w-full mt-2 gap-y-px">
                    {selectedData.childTask
                      ? selectedData.childTask?.map((item, index) => (
                          <div key={index}>
                            <button
                              onClick={() => handleOpenModal(item)}
                              className="flex w-full flex-row border rounded-sm px-2 py-2 shadow-sm hover:shadow-md hover:bg-gray-100 duration-300 cursor-pointer"
                            >
                              <p className="text-p font-medium">
                                {item.taskName}
                              </p>
                            </button>
                            {openModal &&
                              selectedItem &&
                              selectedItem === item && (
                                <SubTaskDetail
                                  selectedData={selectedItem}
                                  open={openModal}
                                  closeModal={handleCloseModal}
                                />
                              )}
                          </div>
                        ))
                      : "No Sub Task"}
                  </div>
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

export default TaskDetail;
