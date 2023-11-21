import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[390px] h-fit relative bg-[#222] rounded-lg overflow-hidden border border-[#444545]">
      <div className="relative p-4">
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-[300px] w-full rounded"
          />
        </div>

        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <h2 className="flex justify-around items-center">
          <div className="text-lg">{product.name}</div>
          <span
            className="bg-pink-300 text-pink-800 text-sm font-medium
               mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300"
          >
            💰 {product.price}
          </span>
          <Link to={`/product/${product._id}`}>
            <button className="bg-[#d61f69] text-white py-1 px-2 rounded-lg">
              Learn More
            </button>
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Product;
