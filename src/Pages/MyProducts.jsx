import { useEffect, useState } from "react";
import useAuth from "../hooks/AuthHook/Auth";
import useAxiosSecure from "../hooks/AuthHook/useAxiosSecure";
import Product from "../Components/Product/Product";
import useAxios from "../hooks/AuthHook/useAxios";

const MyProducts = () => {
  const { user } = useAuth();
  const instance = useAxios();
  const axiosInstance = useAxiosSecure();
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get(`/products?email=${user?.email}`).then((data) => {
      setMyProducts(data.data);
    });
  }, [axiosInstance, user]);
  // console.log(myProducts);

  // ******************handleDelete******************
  const handleDelete = async (_id) => {
    try {
      instance.delete(`/products/${_id}`).then((data) => {
        if (data) {
          const updateData = myProducts.filter(
            (product) => product._id !== _id
          );
          setMyProducts(updateData);
        }
        // console.log(data);
      });
      // const data = await data.json();
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // ******************handleUpdateBtn******************
  const handleUpdateBtn = (id) => {
    console.log(id);
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center my-5">
        My Products:{myProducts.length}
      </h1>
      <div className="overflow-x-auto bg-white max-w-11/12 mx-auto ">
        <table className="table">
          <thead>
            <tr>
              <th>SL No</th>
              <th> Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          {myProducts?.map((pro, index) => (
            <tbody>
              {/* row 1 */}
              <tr>
                <td className="font-semibold">{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={pro.image} alt={pro.title} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{pro.title}</td>

                <td>{pro.select}</td>
                <td>${pro.price_max - pro.price_min}</td>
                <td>Pending</td>
                <td className="flex gap-3">
                  <button
                    onClick={() => handleUpdateBtn(`${pro._id}`)}
                    className="btn btn-xs text-violet-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(`${pro._id}`)}
                    className="btn btn-error btn-xs"
                  >
                    Reject Offer
                  </button>
                  <button className="btn btn-xs text-green-500">
                    Make sold
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
