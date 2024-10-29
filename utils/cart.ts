import Cookies from "js-cookie";
import { append, filter, find, hasPath, isEmpty, path, propEq } from "rambda";

interface ICartProduct {
  [id: string]: {
    [size: string]: {
      quantity: number;
    };
  };
}

export const getCart = (): ICartProduct => {
  const cookieString = Cookies.get("cart");
  return JSON.parse(cookieString || "{}");
};

export const toCart = ({ id, size }: { id: string; size: string }) => {
  const cart: ICartProduct = getCart();
  cart[id] = {
    [size]: {
      quantity: 1,
    },
    ...cart[id],
  };

  Cookies.set("cart", JSON.stringify(cart));
};

export const deleteFromCart = (productId: string, productSize: string) => {
  const cart = getCart();

  delete cart[productId][productSize];

  if (isEmpty(cart[productId])) {
    delete cart[productId];
  }

  Cookies.set("cart", JSON.stringify(cart));
};

export const updateQuantity = (id: string, size: string, qty: number) => {
  const cart: ICartProduct = getCart();

  cart[id][size].quantity = qty;
  Cookies.set("cart", JSON.stringify(cart));
};

export const cartHasId = (id: string, size: string) => {
  const cart = getCart();

  return hasPath([id, size], cart);
};

export const countItemsInCart = () => {
  const cart = getCart();
  let counter = 0;

  Object.keys(cart).forEach((id: string, index: number) => {
    Object.keys(cart[id]).forEach((subId: string, subIndex: number) => {
      counter++;
    });
  });

  return counter;
};
