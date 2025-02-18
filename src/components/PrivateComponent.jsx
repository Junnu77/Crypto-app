import React from "react";
import useAuthStatus from "../hooks/useAuthStatus";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateComponent = () => {
  const { themeMode: theme } = useSelector((state) => state.theme);
  const { isLoggedIn, checkStatus } = useAuthStatus();
  if (checkStatus) {
    return (
      <div
        className={
          theme
            ? "min-h-screen bg-gray-900 px-8 md:px-16 py-8 "
            : "min-h-screen bg-white p-8"
        }
      >
        <h1 className="text-gray-500 font-bold text-2xl text-center">
          Loading....
        </h1>
      </div>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateComponent;
