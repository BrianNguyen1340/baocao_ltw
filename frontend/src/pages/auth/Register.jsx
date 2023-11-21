import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
// import { setCredientials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import registerBg from "../../assets/register-bg.jpg";

const Register = () => {
  // const { userInfo } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const dispatch = useDispatch();

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  // const { search } = useLocation();

  // const sp = new URLSearchParams(search);

  // const redirect = sp.get("redirect") || "/";

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password does not match!");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        // dispatch(setCredientials({ ...res }));
        toast.success("Register is successfully!");
        navigate("/login");
      } catch (error) {
        console.error(error.data.message || error.message);
        toast.error(error.data.message);
      }
    }
  };

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[3rem]">
          <h1 className="text-2xl font-semibold mb-7">Register</h1>

          <form
            onSubmit={submitHandler}
            className="container w-[30rem]"
          >
            <div className="my-[1rem]">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-[1rem] p-3 border rounded w-full bg-[#333] text-white placeholder:text-sm placeholder:text-[#aaa] placeholder:italic"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="my-[1rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="text"
                id="email"
                className="mt-[1rem] p-3 border rounded w-full bg-[#333] text-white placeholder:text-sm placeholder:text-[#aaa] placeholder:italic"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="my-[1rem]">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-[1rem] p-3 border rounded w-full bg-[#333] text-white placeholder:text-sm placeholder:text-[#aaa] placeholder:italic"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="my-[1rem]">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-[1rem] p-3 border rounded w-full bg-[#333] text-white placeholder:text-sm placeholder:text-[#aaa] placeholder:italic"
                placeholder="Re-Enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="off"
              />
            </div>

            <button
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Registering ..." : "Register"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-white">
              Already have an account?{" "}
              <Link
                // to={redirect ? `/login?redirect=${redirect}` : "/login"}
                to={"/login"}
                className="text-pink-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        <img
          src={registerBg}
          alt="registerBg"
          className="h-full w-[50%] xl:block md:hidden sm:hidden rounded-lg mt-[100px]"
        />
      </section>
    </div>
  );
};

export default Register;
