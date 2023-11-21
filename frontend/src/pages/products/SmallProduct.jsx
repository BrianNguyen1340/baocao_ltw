import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-full h-full p-3 bg-[#222] rounded-lg">
      <div className="relative flex flex-col items-center justify-center">
        <div>
          {/* hình ảnh */}
          <img
            src={product.image}
            alt={product.name}
            className="h-[200px] rounded w-full"
          />
        </div>

        <HeartIcon product={product} />

        <div className="py-4 w-full">
          <h2 className="flex justify-between items-center">
            {/* tên */}
            <div>{product.name}</div>
            <span
              className="bg-pink-300 text-pink-800 text-sm font-medium
               mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300"
            >
              {/* giá */}${product.price}
            </span>
            {/* xem chi tiết */}
            <Link to={`/product/${product._id}`}>
              <button className="bg-[#d61f69] text-white py-1 px-2 rounded-lg">
                More
              </button>
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
