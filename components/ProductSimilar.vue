<script setup lang="ts">
import type { StrapiResponse } from "~/composables/useStrapi";

const config = useRuntimeConfig();
const { fetchStrapi } = useStrapi();
const { data: products } = await useAsyncData<StrapiResponse>("products", () =>
  fetchStrapi(`/api/products?populate=*&pagination[pageSize]=4`)
);
</script>
<template>
  <div class="hidden lg:grid grid-cols-4 auto-rows-min pb-10 w-full gap-2">
    <ProductCard
      :size="'small'"
      :product="product"
      v-for="product in products?.data"
    />
  </div>
</template>
