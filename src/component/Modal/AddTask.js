import React from "react";
import Modal from "@mui/material/Modal";

function AddTask(props) {
  const handleClose = () => {};

  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <p>test</p>
    </Modal>
  );
}

export default AddTask;
