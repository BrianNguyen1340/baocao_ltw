import { isValidObjectId } from "mongoose"; // Hàm này được sử dụng để kiểm tra xem một chuỗi có đúng định dạng của một ObjectId trong MongoDB hay không.

const checkId = (req, res, next) => {
  // Trong hàm middleware này, chúng ta kiểm tra xem tham số id trong request có đúng định dạng ObjectId hay không bằng cách sử dụng hàm isValidObjectId từ Mongoose.
  // Nếu không đúng định dạng, chúng ta đặt mã trạng thái của response thành 404 và ném một lỗi với thông báo "Invalid Object of {id}".
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid Object of ${req.params.id}`);
  }
  next();
};

export default checkId;
