import LatestProducts from "../Components/latestProducts";

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

  return (
    <div>
      <h1 className="text-center text-4xl">Recent Products</h1>
      <LatestProducts
        latestProductsPromise={latestProductsPromise}
      ></LatestProducts>
    </div>
  );
};

export default Home;
