import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

// thêm mới sản phẩm
const addProduct = asyncHandler(async (req, res) => {
  try {
    // tại gửi dữ liệu lên theo kiểu formData nên mới có req.fields
    const { name, description, price, category, quantity, brand } = req.fields;

    // kiếm tra sản phẩm đó tồn tại chưa, kiếm tra theo name
    // nếu đã tồn tại
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      throw new Error(`${name} already exists!`);
    }

    // validation form
    switch (true) {
      case !name:
        return res.json({ error: "Name is required!" });

      case !description:
        return res.json({ error: "Description is required!" });

      case !price:
        return res.json({ error: "Price is required!" });

      case !category:
        return res.json({ error: "Category is required!" });

      case !quantity:
        return res.json({ error: "Quantity is required!" });

      case !brand:
        return res.json({ error: "Brand is required!" });
    }

    // tạo sản phẩm mới
    const newProduct = new Product({ ...req.fields });
    // lưu vào db
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

// cập nhật chi tiết sản phẩm
const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    // validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }

    // cập nhật sản phẩm
    const product = await Product.findByIdAndUpdate(
      req.params.id, // id sản phẩm
      { ...req.fields }, // các trường sản phẩm
      { new: true } // trả về dữ liệu sau cập nhật
    );

    // lưu vào db
    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

// xóa sản phẩm
const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//
const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6; // tổng số sản phẩm lấy về mỗi trang, ở đây là 6
    const keyword = req.query.keyword // tạo 1 điều kiện tìm kiếm dựa trên truy vấn của người dùng
      ? {
          name: {
            // biến điều kiện của mongoose được sử dụng để thực hiện các truy vấn dựa trên biểu thức chính quy.
            // Nó cho phép tìm kiếm các giá trị trong một trường dựa trên một mẫu chuỗi cụ thể. Cụ thẻ ở đây là lấy theo name
            $regex: req.query.keyword,
            $options: "i", // biến điều kiện của mongoose, ko phân biệt hoa thường
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword }); // đếm số lượng thỏa mãn yêu cầu tìm kiếm
    // Truy vấn cơ sở dữ liệu để lấy danh sách sản phẩm thỏa mãn điều kiện tìm kiếm và giới hạn kết quả với kích thước trang đã định nghĩa.
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1, // mặc định trang đầu là trang 1
      pages: Math.ceil(count / pageSize), // tổng số trang = tổng số lượng sản phẩm / tổng số lượng sản phẩm hiển thị mỗi trang
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error!" });
  }
});

// lấy chi tiết sản phẩm
const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      throw new Error("Product not found!");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found!" });
  }
});

// lấy tất cả sản phẩm
const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category") // populate là phương thức tham giá trị đến bảng model khác mà cụ thể ở đây là bảng category
      .limit(12) // giới hạn lấy 12 sản phẩm
      .sort({ createAt: -1 }); // sort theo sản được tạo mới nhất

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error!" });
  }
});

// thêm đánh giá sản phẩm, ở đây chỉ cho mỗi người đánh giá sản phẩm đó 1 lần duy nhất
const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    // kiểm tra sản phẩm có tồn tại?
    const product = await Product.findById(req.params.id);

    // nếu có sản phẩm
    if (product) {
      // kiểm tra xem sản phẩm đó được đánh giá chưa
      const alreadyReview = product.reviews.find(
        // chọc vô trường reviews của model product, find là hàm tìm của js
        (r) => r.user.toString() === req.user._id.toString() // so sánh id của user gửi đánh giá với id của user đó có trong db chưa
      );

      // nếu đã đánh giá rồi
      if (alreadyReview) {
        res.status(400);
        throw new Error("Product already reviewd!");
      }

      // tạo đánh giá mới
      const review = {
        name: req.user.username, // username của user
        rating: Number(rating), // số sao đánh giá
        comment, // bình luận
        user: req.user._id, // id của user
      };

      // push review vào trường reviews của model product
      product.reviews.push(review);
      product.numReviews = product.reviews.length; // trường số lượt đánh giá

      // tính điểm trung bình của đánh giá = tổng số sao đánh giá / tổng số lượt đánh giá
      product.rating =
        // tính trung bình số sao đánh giá
        product.reviews.reduce(
          (accumulator, item) => item.rating + accumulator, // accumulator là giá trị trước đó, item là giá trị hiện tại
          0
        ) / product.reviews.length; // tổng số lượt đánh giá

      // lưu đánh giá vào db
      await product.save();
      res.status(201).json({ message: "Review added!" });
    } else {
      console.error(error);
      throw new Error("Product not found!");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json(error.message);
  }
});

// lấy các sản phẩm có đánh giá tốt nhất
const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    // sort theo rating của sản phẩm
    const products = await Product.find({}).sort({ rating: -1 }).limit(4); // rating: -1 nghĩa là lấy phần tử cuối của object, tương đương với 5 sao
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(404).json(error.message);
  }
});

// lấy tất cả sản phẩm mới nhất
const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    // sort theo id
    const products = await Product.find().sort({ _id: -1 }).limit(5); // _id: -1 là là lấy sản phẩm cuối cùng trong db
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(404).json(error.message);
  }
});

// lọc sản phẩm
const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {}; // tạo 1 biến args rỗng để lưu các tiêu chí lọc

    // kiếm tra trường check có giá trị ko
    if (checked.length > 0) {
      args.category = checked;
    }
    // kiểm tra trường radio có giá trị ko
    if (radio.length) {
      //
      args.price = { $gte: radio[0], $lte: radio[1] };
      // $gte là $lte là 2 biến điều kiện trong mongoose
      // $gte >= , $lte <=
    }
    // trả về tất cả sản phẩm sau khi lọc
    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error!" });
  }
});

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
};
