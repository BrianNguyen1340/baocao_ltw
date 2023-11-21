import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// route cần đăng nhập
const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};

export default PrivateRoute;
