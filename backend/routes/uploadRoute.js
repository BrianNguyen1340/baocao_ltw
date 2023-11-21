import express from "express";
import path from "path";
import multer from "multer"; // Thư viện middleware Node.js cho việc xử lý multipart/form-data, chủ yếu được sử dụng để tải lên tệp tin.

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Xác định thư mục nơi tệp tin sẽ được lưu trữ. Ở đây là thư mục "uploads/".
  },

  // filename: đặt tên cho tệp tin tải lên dựa trên thời gian và phần mở rộng của tệp tin.
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

//  Định nghĩa các định dạng phần mở rộng và kiểu file được chấp nhận.
const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/; //
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
};

// thư viện nhận 2 giá trị: store lưu trữ ảnh, kiểu file
const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image"); // ở đây mỗi lần chỉ cho up 1 ảnh

// updoad image
router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully!",
        image: `/${req.file.path}`,
      });
    } else {
      res.status(400).send({ message: "No image file provided!" });
    }
  });
});

export default router;
