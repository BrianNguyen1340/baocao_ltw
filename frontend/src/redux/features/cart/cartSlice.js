import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../utils/cart";

// Khởi tạo initialState bằng cách lấy dữ liệu từ localStorage nếu có?
// Nếu không sẽ sử dụng một đối tượng mặc định chứa các thuộc tính như cartItems, shippingAddress, và paymentMethod.
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Thêm một mặt hàng vào giỏ hàng.
    addToCart: (state, action) => {
      const { user, rating, numReviews, reviews, ...item } = action.payload;
      // Nó kiểm tra xem mặt hàng đã tồn tại trong giỏ hàng chưa.
      const existItem = state.cartItems.find((x) => x._id === item._id);

      // Nếu có thì cập nhật thông tin của mặt hàng đó, nếu không thì thêm mặt hàng mới vào giỏ hàng.
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Sau đó, nó gọi hàm updateCart để cập nhật giỏ hàng.
      return updateCart(state, item);
    },

    // Xoá một mặt hàng khỏi giỏ hàng dựa trên id của mặt hàng.
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },

    // Lưu địa chỉ giao hàng vào trạng thái và cập nhật dữ liệu vào localStorage.
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Lưu phương thức thanh toán vào trạng thái và cập nhật dữ liệu vào localStorage.
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Xoá tất cả các mặt hàng trong giỏ hàng và cập nhật dữ liệu vào localStorage.
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Đặt lại giỏ hàng về trạng thái ban đầu.
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  savePaymentMethod,
  saveShippingAddress,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
