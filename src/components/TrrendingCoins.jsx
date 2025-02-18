import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTrendingCoins } from "../features/coins/coinSlice";

const TrrendingCoins = () => {
  const { trendingCoins, isLoading, isError } = useSelector(
    (state) => state.coins
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrendingCoins());
  }, []);
  if (isError) {
    return (
      <h1 className="text-center text-red-400 font-semibold uppercase">
        Something Went Wrong...
      </h1>
    );
  }

  if (isLoading) {
    return (
      <h1 className="text-center text-gray-400 font-semibold uppercase">
        Fetching Trending Coins...
      </h1>
    );
  }

  return (
    <>
      <h3 className="text-center text-gray-500 mb-3 text-md font-semibold">
        Trending
      </h3>
      <div className="md:px-24 px-8 flex items-center justify-center flex-wrap">
        {trendingCoins.map((coin) => {
          return (
            <Link
              to={`/coin/${coin.item.id}`}
              key={coin.item.id}
              className="m-1 bg-gray-600 py-1 px-2 text-sm font-bold rounded-lg text-white text-center hover:bg-lime-600"
            >
              {coin.item.name}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default TrrendingCoins;
