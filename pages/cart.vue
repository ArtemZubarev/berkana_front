<script setup lang="ts">
import { find, propEq } from "rambda";

const config = useRuntimeConfig();

const cart: any = useCookie("cart");
const { refreshQty } = inject("cartQty") as any;

const apiQuery = () =>
  stringifyFilters({
    filters: {
      documentId: {
        $in: Object.keys(cart.value),
      },
    },
    populate: "*",
  });

const { data, refresh } = await useAsyncData<any[]>("cart products", () =>
  $fetch(`${config.public.baseURL}/api/products?${apiQuery()}`)
);

const findProduct = (id: string | number) => {
  const prod = find(propEq(id, "documentId"))(data.value!.data);

  if (prod) {
    return prod;
  }

  return {};
};

const deleteProduct = (productId: string, productSize: string) => {
  deleteFromCart(productId, productSize);
  refreshCookie("cart");
  refreshQty();
};

const updateQtty = (id: string, size: string, qty: number) => {
  updateQuantity(id, size, qty);
  refreshCookie("cart");
};

const cartIsEmpty = computed(() => Object.keys(cart.value).length === 0);
</script>

<template>
  <div
    class="cart mx-auto max-w-screen-2xl items-center justify-between py-0 px-2 lg:px-8 overflow-hidden relative"
  >
    <h1 class="text-6xl">Корзина</h1>

    <div
      v-if="cartIsEmpty"
      class="empty relative mt-0 flex flex-col justify-center items-center"
    >
      <img class="max-w-[420px] opacity-50" src="/rabbit.png" alt="" />
      Корзина пуста

      <nuxt-link
        to="/catalog"
        type="button"
        class="inline-block mt-5 text-white hover:text-gray-800 border border-gray-800 bg-gray-800 hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Продолжить покупки
      </nuxt-link>
    </div>

    <div v-else class="">
      <div class="producttList mt-10 divide-y">
        <CartProduct
          v-for="(product, key) in cart"
          :product="product"
          :productDetails="findProduct(key)"
          :key="key"
          @changeQtty=""
          @remove="deleteProduct"
          @updateQtty="updateQtty"
        />
      </div>
      <CartDelivery />
    </div>
  </div>
</template>

<style>
.empty {
}
</style>
