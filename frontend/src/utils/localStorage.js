// retrive favorites from localStorage
export const getFavoritesFromLocalStorage = () => {
  const favoritesJSON = localStorage.getItem("favorites"); // Hàm này lấy dữ liệu từ localStorage với key là "favorites"
  return favoritesJSON ? JSON.parse(favoritesJSON) : []; // Nếu có dữ liệu, nó sẽ chuyển đổi từ chuỗi JSON sang mảng và trả về. Nếu không có dữ liệu, nó sẽ trả về một mảng rỗng.
};

// add product to localStorage
export const addFavoriteToLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage(); // Hàm này lấy danh sách sản phẩm yêu thích từ localStorage bằng cách gọi hàm getFavoritesFromLocalStorage.

  // Sau đó, nó kiểm tra xem sản phẩm cần thêm đã tồn tại trong danh sách yêu thích chưa. Nếu chưa tồn tại, nó sẽ thêm sản phẩm đó vào danh sách và lưu lại vào localStorage.
  if (!favorites.some((p) => p._id === product._id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

// remove product from localStorage
export const removeFavoriteFromLocalStorage = (productId) => {
  // Hàm này cũng lấy danh sách sản phẩm yêu thích từ localStorage.
  const favorites = getFavoritesFromLocalStorage();

  // Sau đó, nó loại bỏ sản phẩm có id trùng khớp với id được truyền vào ra khỏi danh sách và lưu lại danh sách mới vào localStorage.
  const updatedFavorites = favorites.filter(
    (product) => product._id !== productId
  );

  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};
