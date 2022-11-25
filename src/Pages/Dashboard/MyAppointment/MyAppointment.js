import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.inti";

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/booking?patientEmail=${user?.email}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          return res.json();
        })
        .then((data) => {
          setAppointments(data);
        });
    }
  }, [user]);

  return (
    <>
      <h2 className="text-center m-2 font-semibold">
        My Appointments {appointments?.length}
      </h2>
      <div className="overflow-x-auto ">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Treatment</th>
              <th>Price</th>
              <th>Pay</th>
              <th>TransactionId</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((appointment, index) => (
              <tr className="hover" key={index}>
                <th>{index + 1}</th>
                <td>{appointment?.patientName}</td>
                <td>{appointment?.treatmentDate}</td>
                <td>{appointment?.slot}</td>
                <td>{appointment?.treatmentName}</td>
                <td> $ {appointment?.price} /-</td>
                <td>
                  {appointment.price && !appointment.paid && (
                    <Link to={`/dashboard/payment/${appointment._id}`}>
                      <button className="btn btn-xs btn-secondary text-white">
                        Pay
                      </button>
                    </Link>
                  )}
                  {appointment.price && appointment.paid && (
                    <span className="text-pink-500 font-semibold">Paid</span>
                  )}
                </td>
                <td>
                  {appointment.price && appointment.paid && (
                    <span className="text-secondary font-semibold">
                      {appointment.transactionId}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyAppointment;
