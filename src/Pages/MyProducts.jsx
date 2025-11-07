import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/AuthHook/Auth";
import useAxiosSecure from "../hooks/AuthHook/useAxiosSecure";
import Product from "../Components/Product/Product";
import useAxios from "../hooks/AuthHook/useAxios";

const MyProducts = () => {
  const { user } = useAuth();
  const instance = useAxios();
  const editRef = useRef(null);
  const axiosInstance = useAxiosSecure();
  const [myProducts, setMyProducts] = useState([]);
  const [product, setProduct] = useState([]);
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
          console.log(data);

          const updateData = myProducts.filter(
            (product) => product._id !== _id
          );
          setMyProducts(updateData);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  // ******************handleUpdateBtn******************
  const handleEditBtn = () => {
    editRef.current.showModal();
  };

  const handleUpdateBtn = async (e, id) => {
    e.preventDefault();
    const form = e.target;
    const updateProduct = {
      title: form.title.value,
      image: form.image.value,
      price_max: form.price_max.value,
      price_min: form.price_min.value,
    };
    try {
      const data = await instance.patch(`/products/${id}`, updateProduct);
      setProduct((prev) =>
        prev.map((prod) =>
          prod._id === updateProduct._id ? { ...prod, ...updateProduct } : prod
        )
      );
    } catch (error) {
      console.log(error);
    }
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
            <tbody key={pro._id}>
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
                    onClick={() => handleEditBtn(`${pro._id}`)}
                    className="btn btn-xs text-violet-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(`${pro._id}`)}
                    className="btn btn-error btn-xs"
                  >
                    Delete
                  </button>
                  <button className="btn btn-xs text-green-500">
                    Make sold
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        {myProducts.map((pro) => (
          <dialog
            ref={editRef}
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Update the product</h3>
              <form onSubmit={(e) => handleUpdateBtn(e, pro._id)}>
                <fieldset className="fieldset">
                  {/* name  */}
                  <label className="label">Title</label>
                  <input
                    type="text"
                    placeholder="tittle"
                    name="title"
                    defaultValue={pro.title}
                    className="input"
                  />

                  <label className="label">Photo Url</label>
                  <input
                    type="text"
                    placeholder="image"
                    name="image"
                    defaultValue={pro.image}
                    className="input"
                  />
                  {/*price_min*/}
                  <label className="label">price_min</label>
                  <input
                    type="text"
                    name="price_min"
                    className="input"
                    defaultValue={pro.price_min}
                    placeholder="type your price_min"
                  />
                  {/*price_max*/}
                  <label className="label">price_max</label>
                  <input
                    type="text"
                    name="price_max"
                    className="input"
                    defaultValue={pro.price_max}
                    placeholder="type your price_max"
                  />

                  <button type="submit" className="btn gradient mt-4">
                    Submit
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
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
