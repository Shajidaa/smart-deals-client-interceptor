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
    title,
    price_min,
    price_max,
    condition,
    _id: productId,
    image,
  } = product;
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/bids/${productId}`)
      .then((data) => {
        setBidsProduct(data.data);
        // console.log(data);
      });
  }, [productId]);
  // useEffect(() => {
  //   fetch(`http://localhost:3000/products/bids/${productId}`)
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

    fetch("http://localhost:3000/bids", {
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
      const res = await fetch(`http://localhost:3000/bids/${_id}`, {
        method: "Delete",
      });
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
  return (
    <div className="max-w-11/12">
      <div className="">
        <Link to={"/allProducts"}>Back </Link>
        <div className="flex justify-center items-center">
          <div>
            <figure className="px-10 pt-10">
              <img src={image} className="rounded-xl" />
            </figure>
          </div>
          <div>
            <div className="">
              <h2 className="card-title">
                {title}({condition})
              </h2>
              <p>Price: ${price_max - price_min}</p>
            </div>
            <button onClick={handleBidModalOpen} className="btn btn-accent">
              I want to buy this Product
            </button>
          </div>
        </div>

        <dialog
          ref={bidRef}
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Give Seller Your Offered Price
            </h3>
            <form onSubmit={handleBidSubmit}>
              <fieldset className="fieldset">
                {/* name  */}
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  readOnly
                  defaultValue={user?.displayName}
                />
                {/* email  */}
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  readOnly
                  defaultValue={user?.email}
                />
                {/* bid */}
                <label className="label">Bid</label>
                <input
                  type="text"
                  name="bid"
                  className="input"
                  placeholder="type your bid"
                  required
                />

                <button type="submit" className="btn btn-neutral mt-4">
                  Submit bit
                </button>
              </fieldset>
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
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
                  <th className="flex  items-center gap-2">
                    <button className="btn btn-success btn-xs  ">
                      Accept Offer
                    </button>
                    <button
                      onClick={() => handleDelete(`${pro._id}`)}
                      className="btn btn-error btn-xs"
                    >
                      Reject Offer
                    </button>
                  </th>
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
