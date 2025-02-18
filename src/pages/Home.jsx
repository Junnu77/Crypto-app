import React, { useEffect } from "react";
import Form from "../components/Form";
import TrrendingCoins from "../components/TrrendingCoins";
import { useDispatch, useSelector } from "react-redux";
import { coinReset } from "../features/coins/coinSlice";
import CoinList from "../components/coinList";

const Home = () => {
  const { themeMode: theme } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(coinReset());
  }, []);

  return (
    <div
      className={
        theme
          ? "min-h-screen bg-gray-900 px-6 md:px-16 py-16 "
          : "min-h-screen bg-white p-6"
      }
    >
      <h1 className="text-gray-500 font-bold text-4xl text-center">
        We Are World's Best Crypto Trading Market!
      </h1>
      <p className="mt-4 mb-10 text-sm font-semibold text-center text-gray-600">
        Now Search And Get Industry Insights Of Crypto World At Your Fingertips
        .
      </p>

      <Form />

      <TrrendingCoins />
      <CoinList />
    </div>
  );
};

export default Home;
