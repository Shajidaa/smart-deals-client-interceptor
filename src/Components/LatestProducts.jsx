import React, { useEffect, useState } from "react";
import Product from "./Product/Product";
import Spinner from "./Spinner/Spinner";

const LatestProducts = ({ latestProductsPromise }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    const fetchProducts = async () => {
      const data = await latestProductsPromise;
      setProducts(data);
    };
    fetchProducts();
  }, [latestProductsPromise]);
  // console.log(products);
  // const products = use(latestProductsPromise);
  // console.log(products);
  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 max-w-11/12 mx-auto">
      {products.map((pro) => (
        <Product pro={pro} key={pro._id}>
          {pro}
        </Product>
      ))}
    </div>
  );
};

export default LatestProducts;
