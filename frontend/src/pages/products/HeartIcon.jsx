import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorite/favoriteSlice";
import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites) || [];

  // Kiểm tra xem sản phẩm hiện tại có trong mảng favorites không bằng cách sử dụng phương thức some.
  const isFavorites = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage(product);
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorites = () => {
    // nếu sản phẩm đó đã được thích rồi
    if (isFavorites) {
      dispatch(removeFromFavorites(product));
      // remove the product from the localStorage as well
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      // add the product to the localStorage as well
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div
      onClick={toggleFavorites}
      className="absolute top-5 right-5 cursor-pointer"
    >
      {isFavorites ? (
        <FaHeart
          className="text-pink-500"
          size={26}
        />
      ) : (
        <FaRegHeart
          className="text-white"
          size={26}
        />
      )}
    </div>
  );
};

export default HeartIcon;
