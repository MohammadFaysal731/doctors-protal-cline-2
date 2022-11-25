import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebase.inti";
const Navbar = () => {
  const [user] = useAuthState(auth);

const logout=()=>{
  signOut(auth);
  localStorage.removeItem('accessToken')
}

  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>

      <li>
        <Link to="/appointment">Appointment</Link>
      </li>
      <li>
        <Link to="/review">Review</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      {user && (
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      )}
      <li>
        {user ? (
          <>
            <button onClick={logout} className="">
              Sign Out
            </button>
            <h2 className="text-xl uppercase">
              {user.displayName?.slice(0, 2)}
            </h2>
            <img className="w-[25%] rounded-full" src={user?.photoURL} alt={user?.displayName} />
          </>
        ) : (
          <Link to="/signin">Sign in</Link>
        )}
      </li>
    </>
  );
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost lg:hidden">
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
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 space-x-2"
            >
              {menuItems}
            </ul>
          </div>
          <h1 className=" normal-case text-xl">Doctors Portal</h1>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0 space-x-2 rounded-full">{menuItems}</ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
