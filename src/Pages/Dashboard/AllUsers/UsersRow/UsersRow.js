import React from "react";
import { toast } from "react-toastify";

const UsersRow = ({ user, index, refetch }) => {
  const { email, role } = user;

  const makeAdmin = () => {
    fetch(`http://localhost:5000/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if(res.status ===403){
          toast.error('Failed to make an admin');

        }
       return res.json()
      })
      .then((data) => {
        if (data.modifiedCount > 0 ) {
          refetch();
          toast.success(`Now ${email} is the admin`);
        }
      });
  };

  return (
    <>
      <tr>
        <th className="text-rose-500">{index + 1}</th>
        <td className="text-blue-500">{email}</td>
        <td>
          <button className="btn-link  text-pink-500">General</button>
        </td>
        <td>
          <button className="btn-link text-purple-500">Moderator</button>
        </td>

        <td>
          {role === "admin" ? (
            <button className="btn-link text-green-500">Admin</button>
          ) : (
            <button onClick={makeAdmin} className="btn-link text-primary">
              Admin
            </button>
          )}
        </td>
        <td>
          <button className="btn-link text-orange-500">Remove</button>
        </td>
      </tr>
    </>
  );
};

export default UsersRow;
