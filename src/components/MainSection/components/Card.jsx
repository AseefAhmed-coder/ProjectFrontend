import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { axiosDelete } from "../../../axiosServices";

const Card = ({ empData, handleEdit, handleReRender}) => {
  const { firstname, lastname, activity, email, image } = empData
  const [dropDown, setDropdown] = useState(false)

  const handleDelete = async(id) =>{
    //console.log(id)
    const confirmed = window.confirm("Are you sure you want to delete this card?");
    if (confirmed) {
      try {
        const res = await axiosDelete(`/client/${id}`);
        console.log(res);
        handleReRender();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="card-component">
      <div className="card-inner">
        <div className="dropdownContainer">
          <BsThreeDotsVertical size={20} onClick={() => setDropdown(!dropDown)} />
          {
            dropDown && <ul className="dropdown"
              onMouseLeave={() => setDropdown(false)}
            >
              <li onClick={()=>handleEdit(empData._id)}>Edit</li>
              <li onClick={()=>handleDelete(empData._id)}>Delete</li>
            </ul>
          }
        </div>
        <div className="profileImage">
          <img
          src={image}
            alt={firstname}
          />
        </div>
        <div className="emp-detail">
          <h3>{firstname} {lastname}</h3>
          <p>{email}</p>
        </div>
      </div>
      <div className="job-role">
        <p>{activity}</p>
      </div>
    </div>
  );
};

export default Card;
