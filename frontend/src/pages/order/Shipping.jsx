import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";
import { toast } from "react-toastify";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Kiểm tra hợp lệ
    if (!address.trim()) {
      toast.error("Address is required");
      return;
    }

    if (!city.trim()) {
      toast.error("City is required");
      return;
    }

    if (!postalCode.trim()) {
      toast.error("Postal Code is required");
      return;
    }

    if (!country.trim()) {
      toast.error("Country is required");
      return;
    }

    if (!paymentMethod) {
      toast.error("Payment method is required");
      return;
    }

    dispatch(saveShippingAddress(address, city, postalCode, country));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="container mx-auto mt-10">
      <ProgressSteps
        step1
        step2
      />
      <div className="mt-[3rem] flex justify-around items-center flex-wrap">
        <form
          onSubmit={submitHandler}
          className="w-[40rem]"
        >
          <h1 className="text-2xl font-semibold mb-4">Shipping</h1>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-white mb-2"
            >
              Address
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded bg-black text-white"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-white mb-2"
            >
              City
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded bg-black text-white"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-white mb-2"
            >
              Postal Code
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded bg-black text-white"
              placeholder="Enter your postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-white mb-2"
            >
              Country
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded bg-black text-white"
              placeholder="Enter your country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400">Select Method</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-pink-500"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  autoComplete="off"
                />
                <span className="ml-2">PayPal or Credit Card</span>
              </label>
            </div>
          </div>

          <button
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
