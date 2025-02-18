import React, { useEffect } from "react";
import BackButton from "../components/BackButton";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const formatINR = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number);
};

const Cart = () => {
  const { themeMode: theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const total = cartItems.reduce(
    (a, c) => a + (c?.market_data?.current_price?.inr || 0) * c.qty,
    0
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, cartItems]);
  return (
    <div
      className={
        theme
          ? "min-h-screen bg-gray-900 px-8 md:px-16 py-16"
          : "min-h-screen bg-white px-8 md:px-16 py-16"
      }
    >
      <BackButton url={"/"} />
      <h1 className="text-center text-2xl font-bold text-rose-400 my-4">
        Your Cart
      </h1>

      <div className="p-4 border border-gray-300 rounded-sm grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          {cartItems.length === 0 ? (
            <h1 className="text-center text-gray-500 my-4 text-2xl font-semibold">
              No items In cart
            </h1>
          ) : (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>
        <div className="border border-gray-600 p-4 rounded-md col-span-1">
          <h1 className="text-gray-500 text-xl font-bold">Your Bill : </h1>
          <h1 className="text-gray-500 text-2xl font-bold my-2">
            Your Items : {cartItems.length}
          </h1>
          <h1 className="text-emerald-500 text-2xl font-bold my-2">
            Total Amount : {formatINR(total)}
          </h1>
          <button className="hover:bg-green-600 duration-200 hover:cursor-pointer bg-green-500 py-2 px-6 rounded-md w-full my-4 text-sm font-bold text-white">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
