import { createSlice } from "@reduxjs/toolkit"; // là một hàm từ Redux Toolkit giúp giảm bớt boilerplate code khi tạo một slice Redux.

//  định nghĩa trạng thái ban đầu của slice.
// Ở đây, userInfo được khởi tạo từ localStorage, nếu nó tồn tại, nó sẽ được chuyển đổi từ chuỗi JSON sang đối tượng, nếu không, nó sẽ là null.
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

// createSlice nhận vào một đối tượng mô tả slice của Redux với name, initialState, và reducers.
const authSlice = createSlice({
  name: "auth",
  initialState,
  //  chứa các hàm reducers (hàm xử lý các hành động) cho slice này. hiểu đơn giản các function xử lý
  reducers: {
    // là một reducer, cập nhật userInfo trong trạng thái và lưu nó vào localStorage. Nó cũng đặt một thời gian hết hạn cho dữ liệu (30 ngày trong trường hợp này)
    setCredientials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
    },
    //  là một reducer khác, đặt userInfo là null và xóa hết dữ liệu liên quan từ localStorage.
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredientials, logout } = authSlice.actions;
export default authSlice.reducer;
