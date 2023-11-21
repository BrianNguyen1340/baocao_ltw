import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// fetchBaseQuery là một hàm được cung cấp bởi Redux Toolkit để tạo ra một cấu hình cơ bản cho các truy vấn.
// createApi là một hàm của Redux Toolkit được sử dụng để tạo ra một API client.

import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"], //  Là một mảng các loại tag cho các thực thể khác nhau.
  endpoints: () => ({}), // Là một hàm mà bạn có thể sử dụng để định nghĩa các endpoint của API
});
