import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation(); // action logout from userSlice

  // hàm đăng xuất
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout()); // dispatch action logout đến store để đăng xuất người dùng
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between 
      p-4 text-white bg-black w-[8%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          className="flex relative"
          to="/"
        >
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineHome
              className=" mt-[3rem]"
              size={26}
            />
            <span className="ml-2 nav-item-name mt-[3rem]">Home</span>
          </div>
        </Link>

        <Link
          className="flex relative"
          to="/shop"
        >
          <div
            className="flex items-center transition-transform 
          transform hover:translate-x-2"
          >
            <AiOutlineShopping
              className=" mt-[3rem]"
              size={26}
            />
            <span className="ml-2 nav-item-name mt-[3rem]">Shop</span>
          </div>
        </Link>

        <Link
          className="flex relative"
          to="/cart"
        >
          <div
            className="flex items-center transition-transform 
            transform hover:translate-x-2"
          >
            <AiOutlineShoppingCart
              className=" mt-[3rem]"
              size={26}
            />
            <span className="ml-2 nav-item-name mt-[3rem]">Cart</span>
          </div>

          <div className="absolute top-10 left-5">
            {cartItems.length > 0 && (
              <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}
              </span>
            )}
          </div>
        </Link>

        <Link
          className="flex relative"
          to="/favorite"
        >
          <div
            className="flex items-center transition-transform 
          transform hover:translate-x-2"
          >
            <FaHeart
              className=" mt-[3rem]"
              size={26}
            />
            <span className="ml-2 nav-item-name mt-[3rem]">Favorite</span>
            <FavoritesCount />
          </div>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-[-1rem] z-50 mt-[-1rem] space-y-2 bg-[#181818] text-white w-[120px]
            ${!userInfo.isAdmin ? "-top-20" : "top-[-360px]"}`}
          >
            {/* Nếu người dùng là admin */}
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-[#222]"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-[#222]"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/allproductslist"
                    className="block px-4 py-2 hover:bg-[#222]"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-[#222]"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-[#222]"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-[#222]"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-[#222]"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                onClick={logoutHandler}
                to="/logout"
                className="block px-4 py-2 hover:bg-[#222]"
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Nếu dùng chưa đăng nhập hoặc đăng ký */}
      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform 
                transform hover:translate-x-2"
            >
              <AiOutlineLogin
                className=" mt-[3rem]"
                size={26}
              />
              <span className="ml-2 hidden nav-item-name mt-[3rem]">LOGIN</span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center transition-transform 
                transform hover:translate-x-2"
            >
              <AiOutlineUserAdd
                className=" mt-[3rem]"
                size={26}
              />
              <span className="ml-2 hidden nav-item-name mt-[3rem]">
                REGISTER
              </span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
