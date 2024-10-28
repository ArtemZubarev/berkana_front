<script setup lang="ts">
const config = useRuntimeConfig();
const baseUrl = config.public.baseURL;

const cart: any = useCookie("cart");

const apiQuery = () =>
  stringifyFilters({
    filters: {
      documentId: {
        $in: cart.value.map(({ id }: any) => id),
      },
    },
    populate: "*",
  });

const { data, refresh } = await useAsyncData("cart products", () =>
  $fetch(`${config.public.baseURL}/api/products?${apiQuery()}`)
);

const productImg = (url: string) => `${baseUrl}${url}`;
</script>

<template>
  <div
    class="cart mx-auto max-w-screen-2xl items-center justify-between py-0 px-2 lg:px-8 overflow-hidden relative"
  >
    <h1 class="text-6xl">Корзина</h1>

    <div class="producttList mt-10 divide-y">
      <div
        class="product flex items-center justify-between max-w-[60%] py-4"
        v-for="product in data.data"
      >
        <div class="productImg rounded-full overflow-hidden">
          <img
            class="object-cover w-[80px] h-[80px]"
            :src="productImg(product.preview.formats.thumbnail.url)"
            :alt="product.name"
          />
        </div>
        <div class="productName grow pl-8">{{ product.name }}</div>
        <div class="productQty">
          <InputCounter />
        </div>
        <div class="productSize"></div>
        <div class="productPrice"></div>
        <div class="productDel ml-10">
          <button class="delete opacity-50 hover:opacity-30">
            <nuxt-icon name="delete" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
