import React from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import UsersRow from "./UsersRow/UsersRow";

const AllUsers = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch(`http://localhost:5000/user`,{
      method:'GET',
      headers:{
        authorization:` Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <h2 className="text-center font-semibold">All Users {users?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th className="text-rose-500">Sl</th>
              <th className="text-blue-500">Name</th>
              <th className="text-pink-500">Role</th>
              <th className="text-purple-500">Make Moderator</th>
              <th className="text-primary">Make Admin</th>
              <th className="text-orange-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {users?.map((user, index) => (
              <UsersRow
                user={user}
                key={user._id}
                index={index}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
