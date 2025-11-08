import { useEffect, useState } from "react";
import Product from "../Components/Product/Product";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  // const allProductsData = fetch(`https://smart-deals-server-nine.vercel.app/allProducts`).then(
  //   (res) => res.json()
  // );

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const data = await allProductsData;
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, []);

  useEffect(() => {
    fetch(`https://smart-deals-server-nine.vercel.app/allProducts`).then(
      (res) =>
        res.json().then((data) => {
          setProducts(data);
        })
    );
  }, []);
  //   fetch(`https://smart-deals-server-nine.vercel.app/allProducts`).then(
  //     (res) =>
  //       res.json().then((data) => {
  //         setProducts(data);
  //       })
  //   );
  // }, []);

  return (
    <div>
      <h1 className="text-center text-4xl my-5 font-semibold"> All products</h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 max-w-11/12 mx-auto">
        {products.map((pro) => (
          <Product pro={pro} key={pro._id}>
            {pro}
          </Product>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
