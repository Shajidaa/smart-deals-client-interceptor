import { useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
import useAuth from "../hooks/AuthHook/Auth";
import useAxiosSecure from "../hooks/AuthHook/useAxiosSecure";

const MyBids = () => {
  // const { user } = use(AuthContext);
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const [bidsProduct, setBidsProduct] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/bids?email=${user?.email}`)
      .then((data) => setBidsProduct(data.data));
  }, [user, axiosInstance]);

  // useEffect(() => {
  //   if (user) {
  //     fetch(`http://localhost:3000/bids?email=${user?.email}`, {
  //       headers: {
  //         authorization: `Bearer ${user.accessToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setBidsProduct(data);
  //       });
  //   }
  // }, [user]);

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
    <div>
      <p className="text-2xl font-semibold text-center my-5">
        My Bids: {bidsProduct?.length}
      </p>
      <div>
        <>
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
                <tbody>
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
                    <th>
                      <button
                        onClick={() => handleDelete(`${pro._id}`)}
                        className="btn btn-error btn-xs"
                      >
                        Remove Bid
                      </button>
                    </th>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </>
      </div>
    </div>
  );
};

export default MyBids;
