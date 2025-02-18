import React, { useEffect } from "react";
import BackButton from "../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCoin } from "../features/coins/coinSlice";
import { add } from "../features/cart/cartSlice";
import Chart from "../components/Chart";
import { toast } from "react-toastify";

const formatINR = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number);
};

const CoinDetails = () => {
  const { themeMode: theme } = useSelector((state) => state.theme);
  const { isLoading, isError, coin } = useSelector((state) => state.coins);
  const dispatch = useDispatch();
  const { coinid } = useParams();

  const handleAddToCart = (item) => {
    dispatch(add(item));
    toast.success("Coin Added Successfully!", { autoClose: 1000 });
  };

  useEffect(() => {
    dispatch(getCoin(coinid));
  }, []);

  if (isLoading || !coin) {
    return (
      <div
        className={
          theme
            ? "min-h-screen bg-gray-900 px-8 md:px-16 py-8 "
            : "min-h-screen bg-white p-8"
        }
      >
        <h1 className="text-gray-500 font-bold text-2xl text-center">
          Fetching Coin Details....
        </h1>
      </div>
    );
  }

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

  return (
    <div
      className={
        theme
          ? "min-h-screen bg-gray-900 px-8 md:px-16 py-10"
          : "min-h-screen bg-white px-8 md:px-16 py-10"
      }
    >
      <BackButton url={`/`} />

      <div className="border border-gray-500 p-2 rounded-sm flex items-center flex-col space-y-2 md:flex-row md:space-y-0 space-x-0 md:space-x-2 ">
        <div className="w-2/6 flex items-center justify-center flex-col">
          {/* <div className="flex items-center justify-center p-4 rounded-md w-full md:w-1/3"> */}
          <img className="h-36" src={coin?.image.large} alt="Coin Image" />
          {/* </div> */}
          <div className="relative  p-4 rounded-md w-full">
            <h1 className="text-gray-400 text-2xl font-bold my-2">
              Name : {coin?.name}
            </h1>
            <h2 className="text-gray-400 text-xl font-bold my-2">
              Symbol : {coin?.symbol}
            </h2>
            <h3 className="text-green-400 text-2xl font-bold my-2">
              Price : {formatINR(coin?.market_data.current_price.inr)}
            </h3>
            <div className="bg-green-600 rounded-md text-center text-sm font-semibold text-white p-1 absolute top-9 right-3">
              <p>Rank #{coin?.market_cap_rank}</p>
            </div>
            <div className="h-40 overflow-auto">
              <p className="text-gray-400 my-2 text-sm">
                {coin?.description.en}
              </p>
            </div>
            <button
              onClick={() => handleAddToCart(coin)}
              className="my-4 text-center bg-green-600 text-white p-2 w-full rounded-md hover:bg-green-800 duration-200 font-bold"
            >
              Add To Cart
            </button>
          </div>
        </div>
        <div className="w-4/6 pl-2">
          <Chart coinSymbol={coin.symbol.toUpperCase() || "BTC"} />
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
