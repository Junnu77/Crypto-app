import React, { useEffect, useState } from "react";
import "/src/index.css"; // Make sure to create this CSS file
import { useDispatch, useSelector } from "react-redux";
import { getTickerCoins } from "../features/coins/coinSlice";

const formatINR = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number);
};

const CryptoTicker = () => {
  const [isPaused, setIsPaused] = useState(false);
  const { tickerCoins, isLoading, isError } = useSelector(
    (state) => state.coins
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickerCoins());
  }, [dispatch]);

  if (!tickerCoins || tickerCoins.length === 0) {
    return (
      <h1 className="text-center text-gray-400 font-semibold uppercase">
        No coins data available
      </h1>
    );
  }
  if (isLoading) {
    return (
      <h1 className="text-center text-gray-400 font-semibold uppercase">
        Fetching Coins...
      </h1>
    );
  }
  if (isError) {
    return (
      <h1 className="text-center text-red-400 font-semibold uppercase">
        Something Went Wrong...
      </h1>
    );
  }

  return (
    <div className="relative w-full">
      <div className="w-full bg-slate-900 h-14 overflow-hidden">
        <div
          className="ticker-container inline-flex items-center h-full"
          style={{
            animation: "ticker 280s linear infinite",
            whiteSpace: "nowrap",
          }}
          // onMouseEnter={() => setIsPaused(true)}
          // onMouseLeave={() => setIsPaused(false)}
        >
          {/* First set of items */}
          {tickerCoins.map((crypto, index) => (
            <div
              key={`${crypto?.name || "unknown"}-${index}`}
              className="inline-flex flex-shrink-0 mx-4 bg-slate-800 rounded-lg px-6 py-5 shadow-lg hover:bg-slate-700 transition-colors duration-300 cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-sm text-gray-400 font-medium">
                  {crypto?.name || "unknown"}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-white font-bold">
                    {formatINR(Number(crypto?.current_price || 0).toFixed(2))}
                  </span>
                  <span
                    className={`text-sm ${
                      Number(crypto?.price_change_percentage_24h || 0) >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {Number(crypto?.price_change_percentage_24h || 0) >= 0
                      ? "+"
                      : ""}
                    {Number(crypto?.price_change_percentage_24h || 0).toFixed(
                      2
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {tickerCoins.map((crypto, index) => (
            <div
              key={`${crypto.name || "unknown"}-duplicate-${index}`}
              className="inline-flex flex-shrink-0 mx-4 bg-slate-800 rounded-lg px-6 py-5 shadow-lg hover:bg-slate-700 transition-colors duration-300 cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-sm text-gray-400 font-medium">
                  {crypto?.name || "unknown"}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-white font-bold">
                    {formatINR(Number(crypto?.current_price || 0).toFixed(2))}
                  </span>
                  <span
                    className={`text-sm ${
                      Number(crypto?.price_change_percentage_24h || 0) >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {Number(crypto?.price_change_percentage_24h || 0) >= 0
                      ? "+"
                      : ""}
                    {Number(crypto?.price_change_percentage_24h || 0).toFixed(
                      2
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoTicker;
