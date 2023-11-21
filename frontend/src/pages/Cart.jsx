import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // thêm sp vào giỏ hàng
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  // xóa sp
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // thanh toán
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div className="flex flex-col">
            <p className="font-bold ml-[3rem] my-[3rem] text-[30px]">
              YOUR CART IS EMPTY 😢😢😢
            </p>
            <p className="font-bold ml-[3rem] text-[20px]">
              Go to Shop and{" "}
              <Link
                className="text-[#d61f69] italic"
                to="/shop"
              >
                Add More
              </Link>{" "}
              Product! 🛒🛒🛒
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-2xl font-semibold mb-10">Shopping Cart</h1>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center mb-[1rem] pb-2"
                >
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-pink-500"
                    >
                      {item.name}
                    </Link>

                    <div className="mt-2 text-white">{item.brand}</div>
                    <div className="mt-2 text-white">$ {item.price}</div>
                  </div>

                  <div className="w-24">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                      className="w-full p-1 border bg-black rounded text-white"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option
                          value={x + 1}
                          key={x + 1}
                        >
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="text-red-500 sr-[5rem]"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-[1rem]" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-8">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                    items)
                  </h2>

                  <div className="text-2xl font-bold">
                    ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>

                  <div className="flex justify-between">
                    <button
                      disabled={cartItems.length === 0}
                      className="bg-pink-500 mt-4 py-2 rounded-full text-lg w-[30rem]"
                      onClick={checkoutHandler}
                    >
                      Proceed To Checkout
                    </button>
                    <Link
                      to="/shop"
                      className="bg-pink-500 mt-4 py-2 rounded-full text-center text-lg w-[15rem]"
                    >
                      Buy More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
