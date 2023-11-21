import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";

// Tạo danh mục mới
const createCategory = asyncHandler(async (req, res) => {
  try {
    // req từ server
    const { name } = req.body;
    // nếu người dùng chưa nhập name
    if (!name) {
      return res.json({ error: "Category name is required!" });
    }

    // kiểm tra xem danh mục đó tồn tại chưa, kiểm tra bằng trường name
    // nếu đã tồn tại
    const existingCategory = await Category.findOne({ name }); // finOne là hàm của mongoose, dùng để kiếm 1
    if (existingCategory) {
      return res.json({ error: "This category is already exists!" });
    }

    // tạo danh mục mới và lưu nó vào db
    const category = await new Category({ name }).save();
    // phản hồi lại cho client
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

// cập nhật danh mục
const updateCategory = asyncHandler(async (req, res) => {
  try {
    // trường name
    const { name } = req.body;
    // id danh mục
    const { categoryId } = req.params;

    // kiểm tra danh mục đó có tồn tại?
    const category = await Category.findOne({ _id: categoryId });
    // nếu không tồn tại
    if (!category) {
      return res.status(404).json({ error: "Category not found!" });
    }

    // set trường name trong db thành name mà user nhập
    category.name = name;

    // lưu thông tin mới cập nhật vào db
    const updatedCategory = await category.save();
    // phản hồi lại cho client
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

// xóa danh mục
const removeCategory = asyncHandler(async (req, res) => {
  try {
    // xóa danh mục theo id
    const removed = await Category.findByIdAndDelete(req.params.categoryId); // findByIdAndDelete là hàm của mongoose, tìm và xóa theo id đó
    res.json(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

// danh sách danh mục
const listCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({}); // find là tìm tất cả
    res.json(categories);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

// lấy 1 danh mục
const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id }); // lấy theo id
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};
