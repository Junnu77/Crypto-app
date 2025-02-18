import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllCoins from "./pages/AllCoins";
import CoinDetails from "./pages/CoinDetails";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateComponent from "./components/PrivateComponent";
import ChartPage from "./pages/ChartPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:coinQuery" element={<AllCoins />} />
        <Route path="/coin/:coinid" element={<CoinDetails />} />
        <Route path="/cart" element={<PrivateComponent />}>
          <Route path="" element={<Cart />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chart/:coinSymbol" element={<ChartPage />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </Router>
  );
};

export default App;

// Get Coins
// https://api.coingecko.com/api/v3/coins/${id}
// Search Coin
// https://api.coingecko.com/api/v3/search?query=${query}
// Trending Coins
// https://api.coingecko.com/api/v3/search/trending
