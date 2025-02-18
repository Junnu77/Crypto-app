import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSearchCoins } from "../features/coins/coinSlice";

const Form = () => {
  const { isLoading, isError, isSuccess, coins } = useSelector(
    (state) => state.coins
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getSearchCoins(text));
    navigate(`/search/${text}`);
  };

  return (
    <form
      className="my-4 w-full md:w-3/4 lg:w-1/2 mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col md:flex-row items-stretch mb-7">
        <input
          type="text"
          className="border p-3 w-full md:w-3/4 my-2 md:my-0 bg-white rounded-lg md:rounded-none md:rounded-l-lg placeholder:text-sm focus:outline-none"
          placeholder="Search Any Coin"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="hover:bg-green-700 bg-green-600 p-3 w-full md:w-1/4 rounded-lg md:rounded-none md:rounded-r-lg text-white font-bold cursor-pointer h-[46px] md:h-auto">
          Search
        </button>
      </div>
    </form>
  );
};

export default Form;
