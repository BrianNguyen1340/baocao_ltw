import express from "express";
import userRoute from "./userRoute.js";
import categoryRoute from "./categoryRoute.js";
import productRoute from "./productRoute.js";
import uploadRoute from "./uploadRoute.js";
import orderRoute from "./orderRoute.js";

const router = express.Router();

const initWebRoutes = (app) => {
  router.use("/users", userRoute);
  router.use("/category", categoryRoute);
  router.use("/products", productRoute);
  router.use("/upload", uploadRoute);
  router.use("/orders", orderRoute);

  return app.use("/api", router);
};

export default initWebRoutes;
