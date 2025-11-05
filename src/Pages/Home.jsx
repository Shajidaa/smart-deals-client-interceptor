import LatestProducts from "../Components/LatestProducts";

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
      <h1 className="text-center text-4xl my-5 font-semibold">
        Recent <span className="text-violet-500">Products </span>
      </h1>
      <LatestProducts
        latestProductsPromise={latestProductsPromise}
      ></LatestProducts>
    </div>
  );
};

export default Home;
