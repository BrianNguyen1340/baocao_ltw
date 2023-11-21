// Hàm này nhận vào một số và làm tròn đến 2 chữ số thập phân
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Đầu tiên, nó tính toán itemsPrice bằng cách cộng tổng giá trị của các sản phẩm trong giỏ hàng và làm tròn đến 2 chữ số thập phân.
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price + item.qty, 0) // tính tổng số tiền các item
  );

  // Tính toán shippingPrice dựa trên giá trị của itemsPrice. Nếu itemsPrice lớn hơn 100, shippingPrice sẽ là 0, ngược lại sẽ là 10.
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10); // tính phí vận chuyển
  // Sau đó, nó tính toán taxPrice bằng cách lấy 15% của itemsPrice và làm tròn đến 2 chữ số thập phân.
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2))); // tính thuế

  // Cuối cùng, tính toán totalPrice bằng cách cộng tổng itemsPrice, shippingPrice, và taxPrice, sau đó làm tròn đến 2 chữ số thập phân.
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // Hàm cũng lưu trạng thái cập nhật vào localStorage với key là "cart" và trả về đối tượng state.
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
