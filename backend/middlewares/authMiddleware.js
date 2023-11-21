import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// hàm kiểm tra đăng nhập
const authenticate = asyncHandler(async (req, res, next) => {
  // tạo biến token
  let token;

  // lấy token từ cookies
  token = req.cookies.jwt;

  // nếu có token
  if (token) {
    try {
      // hàm verify nhận 2 tham số: token và khóa bí mật
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded?.userId).select("-password"); // lọc password ra khỏi res
      next();
    } catch (error) {
      // lỗi chưa đăng nhập
      res.status(401);
      throw new Error("Not authorized, token failed!");
    }
  } else {
    // lỗi chưa đăng nhập
    res.status(401);
    throw new Error("Not authorized, no token!");
  }
});

// hàm kiểm tra có phải admin
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin!");
  }
};

export { authenticate, authorizeAdmin };
