import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
  // apiSlice.injectEndpoints là một phương thức của Redux Toolkit để mở rộng API đã định nghĩa từ apiSlice bằng cách thêm các endpoint mới.
  endpoints: (builder) => ({
    // Trong Redux Toolkit, builder là một đối tượng được truyền vào trong hàm callback khi bạn định nghĩa các endpoints trong createApi.
    // Đối tượng builder cung cấp các phương thức để bạn định nghĩa các loại hoạt động khác nhau như queries, mutations, và tùy chọn cấu hình khác của API.

    // bulder.query -> Được sử dụng để định nghĩa một endpoint cho loại query, tức là một hoạt động đọc dữ liệu từ server
    // builder.mutation: -> Được sử dụng để định nghĩa một endpoint cho loại mutation, tức là một hoạt động thay đổi dữ liệu trên server.

    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: newCategory,
      }),
    }),

    updateCategory: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: updatedCategory,
      }),
    }),

    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
    }),

    fetchCategories: builder.query({
      query: () => `${CATEGORY_URL}/categories`,
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} = categoryApiSlice;
