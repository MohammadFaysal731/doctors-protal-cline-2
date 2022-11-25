import React from 'react';

const ManageDoctorsRow = ({ doctor, index, setDeletingDoctor }) => {
  const { name, email, image, specialty } = doctor;

 

  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>
          <img className="w-8 rounded-full" src={image} alt={name} />
        </td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{specialty}</td>
        <td>
          {/* <!-- The button to open modal --> */}
          <label
            onClick={() => setDeletingDoctor(doctor)}
            htmlFor="delete-confirm-modal"
            className="btn btn-error btn-xs btn-outline"
          >
            Delete
          </label>
        </td>
      </tr>
    </>
  );
};

export default ManageDoctorsRow;