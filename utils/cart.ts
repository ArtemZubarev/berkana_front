import Cookies from "js-cookie";
import { append, filter, find, propEq } from "rambda";

export const getCart = () => {
  const cookieString = Cookies.get("cart");
  return JSON.parse(cookieString || "[]");
};

export const toCart = (id: string) => {
  const newArray = append(
    {
      id,
      quantity: 1,
    },
    getCart()
  );

  Cookies.set("cart", JSON.stringify(newArray));
};

export const deleteFromCart = (id: string) => {
  const filtered = filter((cartId: string) => cartId !== id, getCart());

  Cookies.set("cart", JSON.stringify(filtered));
};

export const cartHasId = (id: string) => {
  const cart = getCart();
  return !!find(propEq(id, "id"))(cart);
};
