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

const AddItemsDialog = (props) => {
  let newItems = null;

  const handleClick = (e, isConfirmed) => {
    e.preventDefault();
    
    if (newItems == null || newItems === "") props.newItems.current = null;
    else {
      let tmp = newItems;
      tmp = newItems.replaceAll("\n", ",").replaceAll(" ", "");
      newItems = tmp.split(",").filter(Boolean);
      props.newItems.current = newItems;
    }

    props.addItems(isConfirmed);
  }

  return (
    <div>
      <Modal 
        isOpen={props.modal} 
        className="modal-dialog-centered"
      >
        <ModalHeader>
          <h2>Add New Items</h2>
        </ModalHeader>
        <ModalBody>
          {/* TODO: allow comma separated values */}
          <div>
            <label
              className="form-control-label"
              htmlFor="input-new-items"
            >
              New Items
            </label>
          </div>
          <Input
            className="form-control-alternative"
            id="input-new-items"
            placeholder="Add one item per line or comma separated (or both, we'll do the cleanup for you)"
            type="textarea"
            defaultValue={props.newItems.current}
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

export default AddItemsDialog;