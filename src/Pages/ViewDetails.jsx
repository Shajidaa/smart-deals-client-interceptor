import React, { use, useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const ViewDetails = () => {
  const product = useLoaderData();
  const { user } = use(AuthContext);
  const bidRef = useRef(null);
  const [bidsProduct, setBidsProduct] = useState([]);
  const [isAdd, setIsAdd] = useState(0);
  const handleBidModalOpen = () => {
    bidRef.current.showModal();
  };
  const {
    _id: productId,

    description,
  } = product;
  useEffect(() => {
    axios
      .get(
        `https://smart-deals-server-nine.vercel.app/products/bids/${productId}`
      )
      .then((data) => {
        setBidsProduct(data.data);
        // console.log(data);
      });
  }, [productId]);
  // useEffect(() => {
  //   fetch(`https://smart-deals-server-nine.vercel.appproducts/bids/${productId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setBidsProduct(data);
  //     });
  // }, [productId, isAdd]);

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    const newBids = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      bid_price: bid,
      status: "pending",
    };

    fetch("https://smart-deals-server-nine.vercel.app/bids", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newBids),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setIsAdd(isAdd + 1);
          bidRef.current.close();
          alert`your bid add `;
          //add the new bid to the state
          const updatedBids = [...bidsProduct, newBids];
          updatedBids.sort((a, b) => b.bid_price - a.bid_price);
          setBidsProduct(updatedBids);
        }
      });
  };

  const handleDelete = async (_id) => {
    try {
      const res = await fetch(
        `https://smart-deals-server-nine.vercel.app/bids/${_id}`,
        {
          method: "Delete",
        }
      );
      const data = await res.json();
      if (data) {
        const remainingBids = bidsProduct.filter((bid) => bid._id !== _id);
        setBidsProduct(remainingBids);
      }
      // console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleEditBtn = () => {};
  return (
    <div className="max-w-11/12 mx-auto my-5 ">
      <div className="min-h-screen bg-base-100  py-10 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Back link */}
          <Link
            to="/allProducts"
            className="text-sm text-blue-500 hover:underline"
          >
            ← Back To Products
          </Link>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Section */}
            <div className="bg-base-200  p-5 rounded-2xl shadow-sm">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-72 object-cover rounded-xl"
              />
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Product Description
                </h2>
                <div className="mt-3 space-y-1 text-sm text-gray-600 dark:text-white">
                  <p>
                    <span className="font-medium text-gray-800 dark:text-white">
                      Condition:
                    </span>{" "}
                    {product.condition}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800 dark:text-white">
                      Usage Time:
                    </span>{" "}
                    {product.usage}
                  </p>
                  <p className="mt-2">{product.description}</p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-4 ">
              <div className="">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {product.title}
                </h1>
                <p className="text-sm text-gray-400 dark:text-white mt-1">
                  For {product.category}
                </p>
              </div>

              <div className="bg-base-200 p-4 rounded-xl shadow-sm">
                <p className="text-lg  font-semibold text-green-600">
                  ৳{product.price_min.toLocaleString()} -{" "}
                  {product.price_max.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Price starts from</p>
              </div>

              <div className="bg-base-200 p-4 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Product Details
                </h3>
                <p className="text-sm text-gray-600">
                  Product ID: {product._id}
                </p>
                <p className="text-sm text-gray-600">
                  Posted: {new Date(product.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-base-200 p-4 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Seller Information
                </h3>
                <div className="flex items-center gap-3">
                  <img
                    src={product.seller_image}
                    alt={product.seller_name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {product.seller_name}
                    </p>
                    <p className="text-sm text-gray-500">{product.location}</p>
                    <p className="text-sm text-gray-500">
                      Contact: {product.seller_contact}
                    </p>
                    <div className="badge badge-warning mt-1 text-xs">
                      {product.status}
                    </div>
                  </div>
                </div>
              </div>
              {user.email === product.email ? (
                <button
                  onClick={handleBidModalOpen}
                  className="btn gradient w-full mt-4 hidden"
                >
                  I Want Buy This Product
                </button>
              ) : (
                <button
                  onClick={handleBidModalOpen}
                  className="btn gradient w-full mt-4"
                >
                  I Want Buy This Product
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Product description */}
      <div className="bg-base-100 p-6 shadow-md rounded-2xl">
        <h3 className="text-lg font-semibold mb-2">Product Description</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
      <dialog ref={bidRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">
            Give Seller Your Offered Price
          </h3>
          <form onSubmit={handleBidSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full"
            />
            <input
              type="email"
              name="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full"
            />
            <input
              type="number"
              name="bid"
              placeholder="Enter your bid price"
              required
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-neutral w-full">
              Submit Bid
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="max-w-11/12 mx-auto">
        <h1 className="text-2xl font-semibold my-5">
          {" "}
          Bids For This Products:{bidsProduct?.length}{" "}
        </h1>

        <div className="overflow-x-auto bg-white ">
          <table className="table">
            <thead>
              <tr>
                <th>SL No</th>
                <th> Seller Image</th>
                <th>Seller </th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            {bidsProduct?.map((pro, index) => (
              <tbody key={pro._id}>
                {/* row 4 */}
                <tr>
                  <td className="font-semibold">{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {pro.buyer_name} <br />
                    {pro.buyer_email}{" "}
                  </td>

                  <td>${pro.bid_price}</td>
                  {user.email === pro.buyer_email ? (
                    <th className="flex  items-center gap-2">
                      <button
                        onClick={handleEditBtn}
                        className="btn btn-success btn-xs  "
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(`${pro._id}`)}
                        className="btn btn-error btn-xs"
                      >
                        Delete
                      </button>
                    </th>
                  ) : (
                    <th className="flex  items-center gap-2">
                      <button readOnly className="btn btn-success btn-xs  ">
                        Edit
                      </button>
                      <button readOnly className="btn btn-error btn-xs">
                        Delete
                      </button>
                    </th>
                  )}
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
