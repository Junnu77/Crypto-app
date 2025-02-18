import React, { useEffect, useState } from "react";
import CoinCard from "../components/CoinCard";
import BackButton from "../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { coinReset, getSearchCoins } from "../features/coins/coinSlice";
import { useParams } from "react-router-dom";

const AllCoins = () => {
  const { themeMode: theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { coinQuery } = useParams();
  const { isLoading, isError, isSuccess, coins } = useSelector(
    (state) => state.coins
  );

  useEffect(() => {
    dispatch(coinReset());
    dispatch(getSearchCoins(coinQuery));
  }, [coinQuery]);

  if (isError) {
    return (
      <div
        className={
          theme
            ? "min-h-screen bg-gray-900 px-8 md:px-16 py-8 "
            : "min-h-screen bg-white p-8"
        }
      >
        <h1 className="text-red-500 font-bold text-2xl text-center">
          404 Coin Not Found
        </h1>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div
        className={
          theme
            ? "min-h-screen bg-gray-900 px-8 md:px-16 py-8 "
            : "min-h-screen bg-white p-8"
        }
      >
        <h1 className="text-gray-500 font-bold text-2xl text-center">
          Searching...
        </h1>
      </div>
    );
  }

  return (
    <div
      className={
        theme
          ? "min-h-screen bg-gray-900 px-8 md:px-16 py-8 "
          : "min-h-screen bg-white p-8"
      }
    >
      <BackButton url={"/"} />
      <h1 className="text-gray-500 font-bold text-2xl text-center">
        Your Search Result
      </h1>

      <div className="my-16 grid grid-col-1 md:grid-cols-4 gap-4">
        {coins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
};

export default AllCoins;
