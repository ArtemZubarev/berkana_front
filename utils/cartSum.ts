const cartSum = (cart: object, products: any[]) => {
  let totalPrice = 0;
  for (const productId in cart) {
    if (cart.hasOwnProperty(productId)) {
      const productSizes = cart[productId];

      const product = products.find((p) => p.documentId === productId);

      if (!product) {
        console.warn(
          `Product with ID ${productId} not found in products array.`
        );
        continue;
      }

      for (const size in productSizes) {
        if (productSizes.hasOwnProperty(size)) {
          const quantity = productSizes[size].quantity;
          const priceInfo = product.price.find(
            (price: any) => price.size === size
          );

          if (!priceInfo) {
            console.warn(
              `Price for size ${size} of product ${productId} not found.`
            );
            continue;
          }

          const price = priceInfo.discount_price
            ? priceInfo.discount_price
            : priceInfo.price;
          totalPrice += price * quantity;
        }
      }
    }
  }
  return totalPrice;
};

export default cartSum;
