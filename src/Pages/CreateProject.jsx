import Swal from "sweetalert2";
import useAuth from "../hooks/AuthHook/Auth";
import useAxiosSecure from "../hooks/AuthHook/useAxiosSecure";
import { useState } from "react";
import { Link } from "react-router";

const CreateProject = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    const product = Object.fromEntries(form.entries());
    const newProduct = {
      ...product,
      created_at: new Date(),
      email: user?.email,
    };

    try {
      const { data } = await axiosSecure.post("/products", newProduct);
      if (data.insertedId) {
        Swal.fire(
          "Success!",
          "The product has been created successfully!",
          "success"
        );
        e.target.reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Oops!",
        "Something went wrong while creating the product.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Link to={"/allProducts"}>← Back To Products</Link>

      <h2 className="text-center text-4xl font-bold mt-4">
        Create <span className="text-indigo-500">A Product</span>
      </h2>

      <form
        onSubmit={handleCreateProduct}
        className="bg-white border border-gray-200 shadow-lg rounded-2xl p-8 mt-6"
      >
        {/* Title */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Yamaha Fz Guitar for Sale"
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label font-semibold">Category</label>
            <select
              name="select"
              required
              className="select select-bordered w-full"
            >
              <option disabled>Select a Category</option>
              <option>Furniture</option>
              <option>Vehicles</option>
              <option>Home Appliances</option>
              <option>Electronics</option>
              <option>Baby Products</option>
            </select>
          </div>
        </div>

        {/* Price */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="label font-semibold">Min Price ($)</label>
            <input
              type="number"
              name="price_min"
              placeholder="e.g. 18.5"
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label font-semibold">Max Price ($)</label>
            <input
              type="number"
              name="price_max"
              placeholder="Optional (default = Min Price)"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Product Condition */}
        <div className="mt-4">
          <label className="label font-semibold">Product Condition</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="condition"
                value="Brand New"
                defaultChecked
              />
              Brand New
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="condition" value="Used" /> Used
            </label>
          </div>
        </div>

        {/* Usage + Image */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="label font-semibold">Product Usage Time</label>
            <input
              type="text"
              name="usage"
              placeholder="e.g. 1 year 3 month"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label font-semibold">Product Image URL</label>
            <input
              type="url"
              name="image"
              placeholder="https://..."
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Seller Info */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="label font-semibold">Seller Name</label>
            <input
              type="text"
              name="seller_name"
              placeholder="e.g. Artisan Roasters"
              defaultValue={user.displayName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label font-semibold">Seller Email</label>
            <input
              type="email"
              name="seller_email"
              placeholder="leli31955@nrlord.com"
              defaultValue={user.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="label font-semibold">Seller Contact</label>
            <input
              type="text"
              name="seller_contact"
              placeholder="e.g. +1-555-1234"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label font-semibold">Seller Image URL</label>
            <input
              type="url"
              name="seller_image"
              placeholder="https://..."
              defaultValue={user.photoURL}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Location + Description */}
        <div className="mt-4">
          <label className="label font-semibold">Location</label>
          <input
            type="text"
            name="location"
            placeholder="City, Country"
            className="input input-bordered w-full"
          />
        </div>

        <div className="mt-4">
          <label className="label font-semibold">Simple Description</label>
          <textarea
            name="description"
            placeholder="e.g. I bought this product 3 months ago..."
            className="textarea textarea-bordered w-full"
          />
        </div>

        <button
          type="submit"
          className="btn w-full mt-6 gradient text-white font-semibold"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create A Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
