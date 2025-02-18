import React from "react";
import { useDispatch } from "react-redux";
import { add, remove } from "../features/cart/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleRemove = (id) => {
    dispatch(remove(id));
  };
  const handleAdd = (item) => {
    dispatch(add(item));
  };
  return (
    <div className="relative p-4 my-2 border border-gray-600 flex items-center justify-between rounded-md">
      <div className="flex items-center justify-start">
        <img className="h-26" src={item?.image?.large} alt="" />
        <div className="mx-4">
          <h1 className="text-gray-500 font-semibold text-2xl">{item?.name}</h1>
          <h2 className="text-gray-500 font-semibold text-xl">
            Price : Rs. {item?.market_data?.current_price?.inr}
          </h2>
          <h3 className="text-gray-500 font-semibold text-lg">
            Qty : {item?.qty}
          </h3>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => handleAdd(item)}
          className="bg-green-500 text-white cursor-pointer py-1 px-2 rounded-md text-sm font-bold"
        >
          Add
        </button>
        <button
          onClick={() => handleRemove(item.id)}
          className="bg-red-500 text-white cursor-pointer py-1 px-2 rounded-md text-sm font-bold"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
