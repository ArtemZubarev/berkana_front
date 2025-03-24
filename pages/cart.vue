<script setup lang="ts">
useHead({
  title: "Berkana | Корзина",
  meta: [
    {
      name: "description",
      content: ``,
    },
  ],
});
import { find, propEq } from "rambda";
import type { StrapiResponse } from "~/composables/useStrapi";
import { cartToOrderForm } from "~/utils/cart";
import cartSum from "~/utils/cartSum";

const DELIVERY_PRICE = 5;
const FREE_DELIVERY_MIN = 10000;

const cart: any = useCookie("cart");
const { refreshQty } = inject("cartQty") as any;
const { fetchStrapi, postStrapi } = useStrapi();
const isLoading = ref(false);

const apiQuery = () =>
  stringifyFilters({
    filters: {
      documentId: {
        $in: Object.keys(cart.value),
      },
    },
    populate: "*",
  });

const { data, refresh } = await useAsyncData<StrapiResponse>(
  "cart products",
  () => fetchStrapi(`/api/products?${apiQuery()}`)
);

const findProduct = (id: string | number) => {
  const product = find(propEq(id, "documentId"))(data.value?.data);

  if (product) {
    return product;
  }

  return {};
};

const cartIsEmpty = computed(() =>
  cart && cart.value ? Object.keys(cart.value).length === 0 : true
);
const totalSum = computed(() => {
  if (cartIsEmpty.value) {
    return 0;
  }
  const sum = cartSum(cart.value, data.value?.data);
  return sum >= FREE_DELIVERY_MIN ? sum : sum + DELIVERY_PRICE;
});

const deleteProduct = (productId: string, productSize: string) => {
  deleteFromCart(productId, productSize);
  refreshCookie("cart");
  refreshQty();
};

const updateQtty = (id: string, size: string, qty: number) => {
  updateQuantity(id, size, qty);
  refreshCookie("cart");
};

const onGoToPayment = async (deliveryForm) => {
  isLoading.value = true;

  const sum = cartSum(cart.value, data.value?.data);

  const requestData = {
    products: cartToOrderForm(data.value?.data),
    total: totalSum.value,
    deliverySum: totalSum.value - sum,
    sum,
    ...deliveryForm,
  };
  console.log(requestData);

  try {
    const postResponse: any = await postStrapi<StrapiResponse>(
      "/api/orders/create-and-pay",
      { data: requestData }
    );
    console.log(postResponse);

    if (postResponse && postResponse.paymentUrl) {
      window.location.href = postResponse.paymentUrl;
    } else {
      isLoading.value = false;
    }
  } catch (e) {
    isLoading.value = false;
    throw e;
  }
};
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
          @remove="deleteProduct"
          @updateQtty="updateQtty"
        />
      </div>
      <CartDelivery :isLoading="isLoading" @go-to-payment="onGoToPayment">
        <div>
          <CartTotal
            :freeDeliveryMin="FREE_DELIVERY_MIN"
            :deliveryPrice="DELIVERY_PRICE"
            :sum="totalSum"
          />
        </div>
      </CartDelivery>
    </div>
  </div>
</template>

<style></style>
