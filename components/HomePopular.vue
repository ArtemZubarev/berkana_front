<script setup lang="ts">
import { useStrapi, type StrapiResponse } from "~/composables/useStrapi";

const { fetchStrapi } = useStrapi();
const config = useRuntimeConfig();
const { data } = useAsyncData<StrapiResponse>("products_popular", () =>
  fetchStrapi(`/api/products?populate=*`)
);
</script>

<template>
  <div class="mx-auto max-w-screen-2xl p-6 lg:px-8">
    <h2 class="text-4xl md:text-7xl mt-24 text-gray-800">Популярные товары</h2>

    <div
      class="grid grid-cols-2 lg:grid-cols-4 grid-flow-row mt-10 w-full gap-8"
    >
      <ProductCard
        v-for="product in data?.data"
        :size="'medium'"
        :product="product"
        :key="product.id"
      />
    </div>
  </div>
</template>
