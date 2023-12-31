import React, { useContext } from "react";
import RootLayout from "../Layouts/RootLayout";
import { AuthContext } from "../providers/AuthProvider";
import SingleAddCart from "./SingleAddCart";

const cart = () => {
  const {
    localStorageData,
    removeFromCart,
    state: { cart, error, loading },
  } = useContext(AuthContext);

  const price = localStorageData?.map((price) => price?.price);
  const total = price?.reduce((acc, price) => acc + price, 0);
  // console.log(total)

  let content;

  if (loading) {
    content = <p>Loading...</p>;
  }
  if (error) {
    content = <p>Something went wrong..!</p>;
  }
  if (!loading && !error && cart.length) {
    return (
      <div className="flex">
        <div className="overflow-x-auto w-3/5 px-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr className=" ml-20">
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                (content = localStorageData.map((product) => (
                  <SingleAddCart
                    key={product?._id}
                    scart={product}
                    removeFromCart={removeFromCart}
                  ></SingleAddCart>
                )))
              }
            </tbody>
          </table>
        </div>
        <div className="w-2/5 bg-gray-200 m-10   p-10 pt-0">
          <h1 className="text-center py-5 text-2xl ">Checkout your order</h1>
          {localStorageData.map((product, index) => (
            <div key={index + 1} className="mt-2 bg-white shadow-xl py-3">
              <div className="flex justify-between items-center px-5">
                <div className="flex items-center gap-6">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={product?.thumbnail}
                    alt=""
                  />
                  <p className="font-semibold">{product?.title}</p>
                </div>
                <h3 className="font-semibold text-md">{product?.price} Tk</h3>
                {/* <p>{product.thumbnail}</p> */}
              </div>
            </div>
          ))}
          <div className="divider"></div>
          <div className="flex items-center justify-between">
            <select className="select select-bordered w-full max-w-xs text-lg">
              <option value={1} disabled>
                Pick your courier service
              </option>
              <option value={2}>Sundarban Courier Service</option>
              <option value={3}>Pathao Couriers</option>
              <option value={4}>RedX.</option>
              <option value={5}>Delivery Tiger</option>
              <option value={6}>Pathao Courier</option>
              <option value={7}>Karatoa Courier Service </option>
              <option value={8}>Janani Express Parcel Service</option>
            </select>

            <h1 className="text-2xl font-semibold "> Total : {total} Tk </h1>
          </div>
          <div className="text-center mt-10">
            <button className="text-white bg-green-600 px-6 py-3 rounded-lg text-2xl">
              Payment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // return <div className="min-h-screen">{content}</div>;
};

export default cart;
// useCommonLayout
cart.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
