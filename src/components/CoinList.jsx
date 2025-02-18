import React from "react";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CoinList = () => {
  const { tickerCoins } = useSelector((state) => state.coins);
  const { themeMode: theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    dispatch(add(item));
    toast.success("Coin Added Successfully!", { autoClose: 1000 });
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(number);
  };

  function formatBigNumber(number) {
    const formattedNumber = new Intl.NumberFormat("en-IN").format(number);
    const numberString = formattedNumber.replace(/,/g, "");

    if (numberString.length <= 7) {
      return "₹" + formattedNumber + (number >= 1000000 ? " Million" : "");
    } else if (numberString.length <= 9) {
      const millions = (number / 1000000).toFixed(2);
      return "₹" + millions + " Million";
    } else {
      const billions = (number / 1000000000).toFixed(2);
      return "₹" + billions + " Billion";
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 mt-3">
      <div
        className={`rounded-lg shadow-lg overflow-hidden ${
          theme ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`${theme ? "bg-gray-700" : "bg-gray-100"}`}>
                <th className="p-4 text-left">Asset</th>
                <th className="p-4 text-right">Price</th>
                <th className="p-4 text-right">24h Change</th>
                <th className="p-4 text-right">24h High</th>
                <th className="p-4 text-right">24h Low</th>
                <th className="p-4 text-right">Volume</th>
                <th className="p-4 text-right">Market Cap</th>
                <th className="p-4 text-center">Analysis</th>
              </tr>
            </thead>
            <tbody>
              {tickerCoins.map((crypto, index) => (
                <tr
                  key={crypto?.id}
                  className={`border-t ${
                    theme ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-1 md:gap-1.5">
                      <p className="text-md">{crypto?.market_cap_rank}</p>
                      <img
                        src={crypto?.image}
                        alt={crypto?.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <Link to={`/coin/${crypto.id}`}>
                        <div>
                          <div className="font-medium">{crypto?.name}</div>
                          <div className="text-gray-500 text-sm">
                            {crypto?.symbol.toUpperCase()}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </td>
                  <td className="p-4 text-right font-medium">
                    {formatNumber(crypto?.current_price)}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-0.5 md:gap-1">
                      {crypto?.price_change_percentage_24h > 0 ? (
                        <ArrowUpCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDownCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={
                          crypto?.price_change_percentage_24h > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {Math.abs(crypto?.price_change_percentage_24h).toFixed(
                          2
                        )}
                        %
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    {formatNumber(crypto?.high_24h)}
                  </td>
                  <td className="p-4 text-right">
                    {formatNumber(crypto?.low_24h)}
                  </td>
                  <td className="p-4 text-right">
                    {formatBigNumber(crypto?.total_volume)}
                  </td>
                  <td className="p-4 text-right">
                    {formatBigNumber(crypto?.market_cap)}
                  </td>
                  {/* <td className="p-4 text-center">
                    <button
                      onClick={() => handleAddToCart(crypto)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Buy
                    </button>
                  </td> */}
                  <td className="p-4 text-center">
                    <Link to={`/chart/${crypto.symbol.toUpperCase()}`}>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors">
                        Chart
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CoinList;
