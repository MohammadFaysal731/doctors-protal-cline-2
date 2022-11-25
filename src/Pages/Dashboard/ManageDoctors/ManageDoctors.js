import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import DeleteConfirmationModal from './DeleteConfirmationModal/DeleteConfirmationModal';
import ManageDoctorsRow from './ManageDoctorsRow/ManageDoctorsRow';

const ManageDoctors = () => {
  const [deletingDoctor,setDeletingDoctor]=useState(null)
  const { data: doctors, isLoading ,refetch } = useQuery("doctors", () =>
    fetch(`http://localhost:5000/doctor`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if(isLoading){
    return <Loading/>
  }

  return (
    <>
      <h2 className="text-center font-semibold">
        ManageDoctor: {doctors?.length}{" "}
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.map((doctor, index) => (
              <ManageDoctorsRow
                doctor={doctor}
                key={doctor._id}
                index={index}
                setDeletingDoctor={setDeletingDoctor}
              ></ManageDoctorsRow>
            ))}
          </tbody>
        </table>
      </div>
      {deletingDoctor && (
        <DeleteConfirmationModal
          deletingDoctor={deletingDoctor}
          key={deletingDoctor._id}
          refetch={refetch}
          setDeletingDoctor={setDeletingDoctor}
        />
      )}
    </>
  );
};

export default ManageDoctors;