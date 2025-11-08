// import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router";

const Banner = ({ handleSearch, loading }) => {
  //   const [search, setSearch] = useState([]);
  //   const handleSearch = (e) => {
  //     e.preventDefault();
  //     const search_text = e.target.search_text.value;
  //     fetch(`http://localhost:3000/search?search=${search_text}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setSearch(data);
  //       });
  //   };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-r from-pink-100 via-purple-100 to-indigo-100 text-center px-4">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-snug">
        Deal Your <span className="text-purple-600">Products</span>
        <br />
        In A <span className="text-purple-600">Smart</span> Way !
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-gray-600 max-w-md">
        SmartDeals helps you sell, resell, and shop from trusted local sellers —
        all in one place!
      </p>

      {/* Search bar */}
      <form onSubmit={handleSearch}>
        <div className="mt-6 flex items-center w-full max-w-md">
          <input
            type="text"
            name="search_text"
            placeholder="Search for Products, Categories..."
            className="input input-bordered w-full rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary rounded-r-full bg-purple-600 border-none hover:bg-purple-700"
          >
            {loading ? "Searching" : <CiSearch />}
          </button>
        </div>
      </form>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <Link
          to={"/allProducts"}
          className="btn bg-purple-600 text-white border-none hover:bg-purple-700 rounded-full px-6"
        >
          Watch All Products
        </Link>
        <Link
          to={"/createProduct"}
          className="btn btn-outline border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-full px-6"
        >
          Post a Product
        </Link>
      </div>
    </div>
  );
};

export default Banner;
