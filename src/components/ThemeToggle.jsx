import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { themeMode: theme } = useSelector((state) => state.theme);
  const handleThemeChange = () => {
    dispatch(toggleTheme());
    localStorage.setItem("theme", JSON.stringify(!theme));
  };

  return (
    <button
      onClick={() => handleThemeChange()}
      className={`
        relative p-2 h-9 w-16 rounded-full 
        transition-colors duration-300 ease-in-out
        ${theme ? "bg-slate-600" : "bg-blue-100"}
        flex items-center
        shadow-lg hover:shadow-xl
      `}
    >
      <div
        className={`
          absolute w-7 h-7 rounded-full 
          transition-all duration-350 ease-in-out
          ${theme ? "translate-x-5 bg-slate-800" : "translate-x-0 bg-blue-500"}
          flex items-center justify-center
        `}
      >
        {theme ? (
          <Moon className="h-5 w-5 text-white" />
        ) : (
          <Sun className="h-5 w-5 text-white" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
