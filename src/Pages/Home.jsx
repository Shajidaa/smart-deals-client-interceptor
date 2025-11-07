import { useState } from "react";
import Banner from "../Components/Banner/Banner";
import LatestProducts from "../Components/LatestProducts";
import Search from "../Components/Search.jsx/Search";

const Home = () => {
  // const latestProductsPromise = async () => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/latest-products`);
  //     const data = await res.json();
  //     return data;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const latestProductsPromise = fetch(
    "http://localhost:3000/latest-products"
  ).then((res) => res.json());
  const [search, setSearch] = useState(null);
  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search_text.value;
    fetch(`http://localhost:3000/search?search=${search_text}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setSearch(data);
      });
  };
  // console.log(search);

  return (
    <div>
      <Banner handleSearch={handleSearch}></Banner>
      <h1 className="text-center text-4xl my-5 font-semibold">
        Recent <span className="text-violet-500">Products </span>
      </h1>
      {search ? (
        <Search search={search}></Search>
      ) : (
        <LatestProducts
          latestProductsPromise={latestProductsPromise}
        ></LatestProducts>
      )}
    </div>
  );
};

export default Home;
