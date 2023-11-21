import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

// hàm đăng ký
const register = asyncHandler(async (req, res) => {
  // các trường user nhập
  const { username, email, password } = req.body;

  // kiểm tra xem có nhập thiếu trường nào ko? nếu có báo lỗi
  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs!");
  }

  // kiểm tra xem username có ít nhất 6 ký tự không
  if (username.length < 6) {
    throw new Error("Username must be at least 6 characters long!");
  }

  // kiểm tra xem username có chứa ký tự đặc biệt không
  const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
  if (specialChars.test(username)) {
    throw new Error("Username cannot contain special characters!");
  }

  // kiểm tra xem email có đúng định dạng email không
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Please enter an email address!");
  }

  // kiểm tra xem password có ít nhất 8 ký tự không
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long!");
  }

  // kiểm tra xem user tồn tại chưa
  const userExists = await User.findOne({ email });
  // nếu đã tồn tại thì báo lỗi
  if (userExists) res.status(400).send("User already exists!");

  // hàm tạo mã muối
  const salt = await bcrypt.genSalt(12);
  // hàm hash password
  const hashedPassword = await bcrypt.hash(password, salt);

  // tạo user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    // lưu user đã được tạo thành công vào db
    await newUser.save();
    generateToken(res, newUser._id); // tạo token khi đăng ký thành công

    res.status(201).json({
      _id: newUser._id, // id user
      username: newUser.username, // username user
      email: newUser.email, // email user
      isAdmin: newUser.isAdmin, // isAdmin -> default: false
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// đăng ký
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please fill all the inputs!");
  }

  // kiểm tra xem email có đúng định dạng email không
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Please enter an email address!");
  }

  // kiểm tra người dùng có tồn tại?
  const existingUser = await User.findOne({ email });
  // nếu tồn tại
  if (existingUser) {
    // so sánh password người dùng nhập với password trong db
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    // nếu nhập đúng mật khẩu
    if (isPasswordValid) {
      // tạo token
      generateToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return;
    } else {
      throw new Error("Invalid email or password!");
    }
  } else {
    throw new Error("User not found!");
  }
});

// đăng xuất
const logout = asyncHandler(async (req, res) => {
  // clear cookie
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Logged out successfully!",
  });
});

// lấy tất cả người dùng
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// lấy chi tiết người dùng
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// update user
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  // kiểm tra user có tồn tại
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    // cho cập nhật lại password
    if (req.body.password) {
      const satl = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(req.body.password, satl);
      user.password = hashedPassword;
    }

    // lưu vào db
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// xóa user
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    // trong trường hợp bạn là admin thì ko thể xóa chính mình hoặc admin khác
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user!");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed!" });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// lấy 1 user by admin
const getUserIdByAmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// update user by admin
const updateUserIdByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export {
  register,
  login,
  logout,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserIdByAmin,
  updateUserIdByAdmin,
};
