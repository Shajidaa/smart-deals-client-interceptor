import { useState } from "react";
import Banner from "../Components/Banner/Banner";
import LatestProducts from "../Components/LatestProducts";
import Search from "../Components/Search.jsx/Search";

const Home = () => {
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  // const latestProductsPromise = async () => {
  //   try {
  //     const res = await fetch(`https://smart-deals-server-nine.vercel.applatest-products`);
  //     const data = await res.json();
  //     return data;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const latestProductsPromise = fetch(
    "https://smart-deals-server-nine.vercel.applatest-products"
  ).then((res) => res.json());

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    const search_text = e.target.search_text.value.trim();
    fetch(
      `https://smart-deals-server-nine.vercel.appsearch?search=${search_text}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setSearch(data);
        setLoading(false);
        e.target.reset();
      });
  };

  return (
    <div>
      <Banner handleSearch={handleSearch}></Banner>

      {search ? (
        <>
          <h1 className="text-center text-4xl my-5 font-semibold">
            Recent <span className="text-violet-500">Search Products</span>
          </h1>

          <Search search={search} loading={loading}></Search>
        </>
      ) : (
        <>
          <h1 className="text-center text-4xl my-5 font-semibold">
            Recent <span className="text-violet-500">Products </span>
          </h1>
          <LatestProducts
            latestProductsPromise={latestProductsPromise}
          ></LatestProducts>
        </>
      )}
    </div>
  );
};

export default Home;
