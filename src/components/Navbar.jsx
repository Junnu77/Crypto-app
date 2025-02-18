import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import CryptoTicker from "./CryptoTicker";
import { logOutUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const { themeMode: theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOutUser());
    toast.success("Logged Out Successfully!", { autoClose: 2500 });
    navigate("/login");
  };
  return (
    <>
      <nav
        className={
          theme
            ? "bg-gray-800 py-4 px-4 md:px-16 shadow-lg border-b border-gray-800"
            : "bg-gray-200 py-4 px-4 md:px-16 shadow-lg"
        }
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
          <div className="flex-1 w-full sm:w-auto text-center sm:text-left mb-4 sm:mb-0">
            <Link to={"/"}>
              <h1
                className={
                  theme
                    ? "text-white font-black text-xl md:text-2xl"
                    : "text-black font-black text-xl md:text-2xl"
                }
              >
                Crypto<span className="text-red-400">World</span>
              </h1>
            </Link>
          </div>

          <div className="flex items-center justify-center w-full sm:w-auto sm:justify-end gap-3">
            {user ? (
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <Link to={"/cart"}>
                  <button className="bg-green-600 py-1.5 text-white px-4 text-sm font-bold rounded-lg hover:cursor-pointer">
                    Cart ({cartItems.length})
                  </button>
                </Link>
                <button
                  onClick={handleLogOut}
                  className="bg-red-600 py-1.5 text-white px-4 text-sm font-bold rounded-lg hover:cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <Link to={"/register"}>
                  <button className="bg-indigo-500 text-white px-3 py-1.5 text-sm font-semibold rounded hover:cursor-pointer hover:bg-indigo-600 transition">
                    Create Account
                  </button>
                </Link>
                <Link to={"/login"}>
                  <button className="bg-gray-200 text-indigo-600 px-3 py-1.5 text-sm font-semibold rounded hover:cursor-pointer hover:bg-gray-300 transition">
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="mt-0.25">
        <CryptoTicker />
      </div>
    </>
  );
};

export default Navbar;
