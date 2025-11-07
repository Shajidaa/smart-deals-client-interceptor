import { Link } from "react-router";

const Product = ({ pro }) => {
  const { title, price_min, price_max, condition, _id, image } = pro;

  return (
    <div className="card bg-base-100  shadow-sm border">
      <figure className="px-10 pt-10 max-w-96 max-h-96 mx-auto">
        <img className="w-full h-full object-contain" src={image} />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          {title}({condition})
        </h2>
        <p>Price: ${price_max - price_min}</p>
        <div className="card-actions">
          <Link to={`/productsDetails/${_id}`} className="btn btn-outline">
            View details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
