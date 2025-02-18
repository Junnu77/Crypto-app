import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = ({ url }) => {
  return (
    <Link to={url}>
      <button className="bg-slate-600 text-white cursor-pointer py-2 px-6 rounded-md font-bold mb-2">
        <IoMdArrowRoundBack />
      </button>
    </Link>
  );
};

export default BackButton;
