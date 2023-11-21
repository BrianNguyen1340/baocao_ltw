import ProductCarousel from "../pages/products/ProductCarousel";
import SmallProduct from "../pages/products/SmallProduct";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery(); // api lấy tất cả sản phẩm tốt nhất

  if (isLoading) {
    return <Loader />; // hiển animation loading
  }

  if (error) {
    return <h1>ERROR!</h1>; // nếu load lỗi
  }

  return (
    <>
      <div className="grid grid-cols-2 w-[1200px] m-auto gap-5">
        <div style={{ gridColumn: "1/2" }}>
          <div className="grid grid-cols-2 gap-5">
            {/* render danh sách sản phẩm tốt nhất */}
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;
