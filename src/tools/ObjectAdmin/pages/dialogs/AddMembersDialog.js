// import { useState, useRef } from "react";

// reactstrap components
import {
  Button,
  Input,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
} from "reactstrap";

// core components

const AddMembersDialog = (props) => {
  let newItems = null;

  const handleClick = (e, isConfirmed) => {
    e.preventDefault();
    props.newItems.current = (newItems == null || newItems === "") ? null : newItems.split("\n");
    props.addItems(isConfirmed);
  }

  return (
    <div>
      <Modal 
        isOpen={props.modal} 
        className="modal-dialog-centered"
      >
        <ModalHeader>
          <h2>Add New Members</h2>
        </ModalHeader>
        <ModalBody>
          {/* TODO: allow comma separated values */}
          <div>
            <label
              className="form-control-label"
              htmlFor="input-new-members"
            >
              New Members (one UUID per line)
            </label>
          </div>
          <Input
            className="form-control-alternative"
            id="input-new-members"
            placeholder="Add one member UUID per line"
            type="textarea"
            defaultValue={props.newMembers.current}
            onChange={(e) => newItems = e.target.value}
            rows="10"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={(e) => handleClick(e, true)}>Submit</Button>{' '}
          <Button color="secondary" onClick={(e) => handleClick(e, false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddMembersDialog;