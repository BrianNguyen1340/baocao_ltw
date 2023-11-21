import jwt from "jsonwebtoken";

// tạo token
const generateToken = (res, userId) => {
  // nhận 3 giá trị : id user. khóa bí mật, thời gian hết hạn token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  // Set jwt vô cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;
