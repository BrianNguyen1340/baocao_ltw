import { useSelector } from "react-redux";
import { selectedFavoriteProduct } from "../../redux/features/favorite/favoriteSlice";
import Product from "./Product";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector(selectedFavoriteProduct);

  return (
    <div className="ml-[8rem]">
      {favorites && favorites.length > 0 ? (
        <>
          <p className="font-bold ml-[3rem] my-[3rem] text-[30px]">
            FAVORITE PRODUCTS ❤❤❤
          </p>

          <div className="flex flex-wrap gap-5">
            {favorites.map((product) => (
              <Product
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="font-bold ml-[3rem] my-[3rem] text-[30px]">
            FAVORITE PRODUCT IS EMPTY 😢😢😢
          </p>
          <p className="font-bold ml-[3rem] my-[3rem] text-[20px]">
            Go to Shop and{" "}
            <Link
              className="text-[#d61f69] italic"
              to="/shop"
            >
              Add More
            </Link>{" "}
            Favorite Product! 🛒🛒🛒
          </p>
        </>
      )}
    </div>
  );
};

export default Favorites;
