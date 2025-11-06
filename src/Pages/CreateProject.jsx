// import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../hooks/AuthHook/Auth";
// import useAxios from "../hooks/AuthHook/useAxios";
import useAxiosSecure from "../hooks/AuthHook/useAxiosSecure";
import { useState } from "react";

const CreateProject = () => {
  const { user } = useAuth();
  // const instance = useAxios();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const handleCreateProduct = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const newProduct = Object.fromEntries(form.entries());
    console.log(newProduct);

    newProduct.email = user?.email;
    // const newProduct = {
    //   title,
    //   photo,
    //   price_min,
    //   price_max,
    //   email: user.email,

    //   select,
    //   condition,
    // };
    // axios.post(`https://smart-deals-server-nine.vercel.app/products`, newProduct).then((data) => {
    //   console.log(data);
    //   if (data.data.insertedId) {
    //     alert`The product has been create successfully`;
    //   }
    // });
    try {
      axiosSecure.post("/products", newProduct).then((data) => {
        if (data.data.insertedId) {
          Swal.fire("The product has been create successfully!");
          e.target.reset();
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Something went wrong");
    }
    setLoading(false);
    // instance.post("/products", newProduct).then((data) => {
    //   console.log(data.data);
    //   if (data.data.insertedId) {
    //     alert`The product has been create successfully`;
    //   }
    // });
  };
  console.log(loading);

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleCreateProduct}>
        <fieldset className="fieldset">
          {/* name  */}
          <label className="label">Title</label>
          <input
            type="text"
            required
            placeholder="tittle"
            name="title"
            className="input"
          />
          {/* category  */}
          <label className="label">Category</label>
          <select
            defaultValue="Select a Category"
            name="select"
            className="select"
            required
          >
            <option disabled={true}>Select a Category</option>
            <option>Furniture</option>
            <option>Vehicles</option>
            <option>Home Appliances</option>
            <option>Electronics</option>
            <option>Baby Products</option>
          </select>
          {/* email  */}
          <label className="label">Photo Url</label>
          <input
            type="text"
            placeholder="photo url"
            required
            name="photo_url"
            className="input"
          />
          {/*price_min*/}
          <label className="label">price_min</label>
          <input
            type="text"
            name="price_min"
            className="input"
            placeholder="type your price_min"
            required
          />
          {/*price_max*/}
          <label className="label">price_max</label>
          <input
            type="text"
            name="price_max"
            className="input"
            placeholder="type your price_max"
            required
          />
          <label>Product Condition</label>
          <div className="flex gap-2">
            <div className="flex justify-center gap-1 items-center">
              <input
                type="radio"
                name="condition"
                className="radio"
                defaultChecked
              />
              <p>Brand New</p>
            </div>
            <div className="flex justify-center gap-1 items-center">
              {" "}
              <input type="radio" name="condition" className="radio" />
              <p>Used</p>
            </div>
          </div>
          <label>Product Usage Time</label>
          <input
            type="text"
            placeholder="e.g. 1 year 3 month "
            className="input"
            name="usage"
          />
          <label>Seller Name</label>
          <input
            type="text"
            placeholder="e.g. Artisan Roasters "
            className="input"
            name="seller_name"
          />
          <label>Seller Email</label>
          <input
            type="email"
            placeholder="leli31955@nrlord.com "
            className="input"
            name="seller_email"
          />
          <label>Seller Contact</label>
          <input
            type="text"
            placeholder="e.g. +1-555-1234"
            name="seller_contact"
            className="input"
          />
          <label>Seller Image URL</label>
          <input
            type="text"
            name="seller_image"
            placeholder="https://..."
            className="input"
          />
          <label>Location</label>
          <input
            type="text"
            placeholder="city,country"
            className="input"
            name="location"
          />{" "}
          <label>Simple Description about your Product</label>
          <input
            type="text"
            name="description"
            placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning
            guitar is so tough..... "
            className="textarea"
          />
          <button
            type="submit"
            className="btn gradient mt-4"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateProject;
