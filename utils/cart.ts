import Cookies from "js-cookie";
import { append, filter, find, propEq } from "rambda";

export const getCart = () => {
  const cookieString = Cookies.get("cart");
  return JSON.parse(cookieString || "[]");
};

export const toCart = ({ id, size }: { id: string; size: string }) => {
  const newArray = append(
    {
      id,
      size,
      quantity: 1,
    },
    getCart()
  );

  Cookies.set("cart", JSON.stringify(newArray));
};

export const deleteFromCart = (productId: string, productSize: string) => {
  const filtered = filter(
    ({ id, size }) => productId !== id && productSize !== size,
    getCart()
  );

  Cookies.set("cart", JSON.stringify(filtered));
};

export const cartHasId = (id: string) => {
  const cart = getCart();
  return !!find(propEq(id, "id"))(cart);
};
