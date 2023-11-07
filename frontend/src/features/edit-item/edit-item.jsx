import { useState } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./edit-item.scss";
// import * as services from "../../services/services";

const EditItemUI = ({ item, onDelete, onChange }) => {

  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(item);

  const handleEnterKey = async (e) => {
    if (e.key === 'Enter') {
      console.log('do validate');
      onChange(value);
      setIsEdit(false);
    }
  }

  return (
    <div className="crud-item card d-flex flex-row margin-bottom-20">

      {
        isEdit &&
        <input
          onChange={(e) => { setValue(e.target.value) }} value={value}
          onKeyUp={handleEnterKey}
          type="text"
          placeholder="Enter new item"
          className="form-control margin-bottom-20" />
      }
      {
        !isEdit &&
        <h5>{item}</h5>
      }

      <UncontrolledDropdown className="ml-auto">
        <DropdownToggle nav caret>
          <i className="fa fa-ellipsis-v"></i>
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem onClick={() => { setIsEdit(!isEdit) }}>Edit</DropdownItem>
          <DropdownItem onClick={onDelete}>Delete</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default EditItemUI;
