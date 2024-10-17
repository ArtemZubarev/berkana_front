<script setup lang="ts">
const config = useRuntimeConfig();
const baseUrl = config.public.baseURL;
const { id } = useRoute().params;
const { data, error }: any = await useAsyncData("product", () =>
  $fetch(`${config.public.baseURL}/api/products/${id}?populate=*`)
);
// const picture = `${config.public.baseUrl}${data.data.preview.formats.large.url}`;
</script>

<template>
  <div class="product categories max-w-screen-2xl p-6 lg:px-8">
    <div class="box w-1/2">
      <img
        class=""
        :src="`${baseUrl}${data.data.preview.formats.large.url}`"
        alt=""
      />
      <img
        class=""
        :src="`${baseUrl}${data.data.preview.formats.large.url}`"
        alt=""
      />
      <img
        class=""
        :src="`${baseUrl}${data.data.preview.formats.large.url}`"
        alt=""
      />
      <img
        class=""
        :src="`${baseUrl}${data.data.preview.formats.large.url}`"
        alt=""
      />
      <img
        class=""
        :src="`${baseUrl}${data.data.preview.formats.large.url}`"
        alt=""
      />
    </div>
    <div
      class="infoBox ml-1/2 w-1/2 pr-10 sticky bottom-0 right-0 min-h-screen pt-0"
    >
      <h1 class="productName text-3xl mb-5 text-gray-800">
        {{ data.data.name }}
      </h1>

      <CommonSelect :label="'Размер'" />
      <div class="price mb-4 pt-6 text-2xl font-semibold text-gray-700">
        {{ data.data.price[0].price }}
        <span>руб.</span>
      </div>
      <button
        type="button"
        class="text-gray-800 hover:text-white border border-gray-800 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
      >
        В корзину
      </button>

      <p class="productDescription pt-4 text-sm w-3/4 text-gray-500">
        {{ data.data.description }}
      </p>
      <h2 class="text-xl mb-5 text-gray-800 mt-10">Похожие продукты:</h2>
      <ProductSimilar />
    </div>
  </div>
</template>

<style scoped>
.infoBox {
  margin-left: 50%;
}
</style>
