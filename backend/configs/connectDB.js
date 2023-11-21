import mongoose from "mongoose";

// hàm kết nối db
const connectDB = async () => {
  try {
    // đợi cho kết nối tới mongoose db
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // kết nối thành công
    /*
        readyState trong mongoose có 4 trạng thái
        0: Disconnected
        1: Connected
        2: Connecting
        3: Disconnecting
    */
    // nếu readyState === 1 nghĩa là kết nối thành công
    if (conn.connection.readyState === 1)
      console.log("Connecting to Mongoose is successful!");
  } catch (error) {
    // kết nối lỗi
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
