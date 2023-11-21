import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";

import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/user/Profile.jsx";
import AdminRoute from "./pages/admin/AdminRoute.jsx";
import UserList from "./pages/admin/Userlist.jsx";
import CategoryList from "./pages/admin/CategoryList.jsx";
import CreateProduct from "./pages/admin/CreateProduct.jsx";
import AllProducts from "./pages/admin/AllProducts.jsx";
import ProductUpdate from "./pages/admin/ProductUpdate.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/products/Favorites.jsx";
import ProductDetail from "./pages/products/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";
import Shipping from "./pages/order/Shipping.jsx";
import PlaceOrder from "./pages/order/PlaceOrder.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    // Public Routes
    <Route
      path="/"
      element={<App />}
    >
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        index={true}
        path="/"
        element={<Home />}
      />
      <Route
        path="/favorite"
        element={<Favorites />}
      />
      <Route
        path="/product/:id"
        element={<ProductDetail />}
      />
      <Route
        path="/cart"
        element={<Cart />}
      />
      <Route
        path="/shop"
        element={<Shop />}
      />

      {/* Private Routes */}
      <Route
        path=""
        element={<PrivateRoute />}
      >
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/shipping"
          element={<Shipping />}
        />
        <Route
          path="/placeorder"
          element={<PlaceOrder />}
        />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={<AdminRoute />}
      >
        <Route
          path="userlist"
          element={<UserList />}
        />
        <Route
          path="categorylist"
          element={<CategoryList />}
        />
        <Route
          path="productlist"
          element={<CreateProduct />}
        />
        <Route
          path="allproductslist"
          element={<AllProducts />}
        />
        <Route
          path="product/update/:_id"
          element={<ProductUpdate />}
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
