import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../../firebase.inti';
import useAdmin from '../../../hooks/useAdmin';

const Dashboard = () => {
  const [user]=useAuthState(auth);
  const [admin]=useAdmin(user);


  return (
    <div className="drawer drawer-mobile">
      <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* <!-- Page content here --> */}
        <div className="flex justify-end">
          <label
            tabIndex="1"
            htmlFor="dashboard-sidebar"
            className="btn btn-ghost drawer-button lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
        <h2 className="text-md md:text-2xl text-purple-500 font-bold text-center">
          Welcome to Your Dashboard
        </h2>

        <Outlet />
      </div>

      <div className="drawer-side">
        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-52 bg-base-200 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li>
            <Link to="/dashboard">My Appointment</Link>
          </li>
          <li>
            <Link to="/dashboard/myreview">My Review</Link>
          </li>
          <li>
            <Link to="/dashboard/myhistory">My History</Link>
          </li>
          {admin && (
            <>
              <li>
                <Link to="/dashboard/allusers">All Users</Link>
              </li>
              <li>
                <Link to="/dashboard/adddoctor">Add Doctor</Link>
              </li>
              <li>
                <Link to="/dashboard/managedoctors">Manage Doctors</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;