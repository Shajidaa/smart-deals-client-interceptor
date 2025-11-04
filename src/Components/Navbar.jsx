import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, signOutFunc } = useContext(AuthContext);
  const handleSignOut = () => {
    signOutFunc().then(() => {
      alert`sign out successfully`;
    });
  };

  const links = (
    <>
      <li>
        <h1>{user?.displayName}</h1>
        <NavLink
          className={
            "ml-3 border-b-2 border-transparent text-base font-medium text-black"
          }
          to={"/"}
        >
          Home
        </NavLink>
        <NavLink
          className={
            "ml-3 border-b-2 border-transparent text-base font-medium text-black"
          }
          to={"/allProducts"}
        >
          All Products
        </NavLink>
        <NavLink
          className={
            "ml-3 border-b-2 border-transparent text-base font-medium text-black"
          }
          to={"/myProducts"}
        >
          My Products
        </NavLink>
        <NavLink
          className={
            "ml-3 border-b-2 border-transparent text-base font-medium text-black"
          }
          to={"/myBids"}
        >
          My Bids
        </NavLink>
        <NavLink
          className={
            "ml-3 border-b-2 border-transparent text-base font-medium text-black"
          }
          to={"/createProduct"}
        >
          Create Product
        </NavLink>
      </li>
    </>
  );
  return (
    <div className=" bg-base-100 shadow-sm">
      <div className="max-w-11/12 mx-auto navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"} className=" md:text-2xl text-xl font-bold">
            Smart <span className="text-violet-600 ">Deals</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="  px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <div className="w-12 h-12 ">
                <img
                  className="w-full h-full bg-cover object-contain rounded-full"
                  src={user.photoURL}
                  alt=""
                />
              </div>
              <button
                className="btn gradient btn-outline"
                onClick={handleSignOut}
              >
                Log out
              </button>
            </>
          ) : (
            <button className="btn gradient  ">
              <Link to={"/login"}>Login</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
