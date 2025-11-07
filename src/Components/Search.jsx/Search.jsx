import React from "react";
import Product from "../Product/Product";

const Search = ({ search }) => {
  return (
    <div className="gird lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
      {search.map((pro) => (
        <Product pro={pro}></Product>
      ))}
    </div>
  );
};

export default Search;
