<script setup lang="ts">
const config = useRuntimeConfig();
const { data } = await useAsyncData("products", () =>
  $fetch(`${config.public.baseURL}/api/products?populate=*`)
);
</script>

<template>
  <div class="max-w-screen-2xl p-6 lg:px-8">
    <h2 class="text-4xl md:text-9xl mt-24 text-gray-800">Популярные товары</h2>

    <div class="grid grid-cols-4 grid-flow-row mt-10 w-full gap-8">
      <ProductCard
        :size="'large'"
        :product="product"
        v-for="product in data.data"
      />
    </div>
  </div>
</template>
