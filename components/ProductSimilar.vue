<script setup lang="ts">
const config = useRuntimeConfig();
const { data: products } = await useAsyncData("products", () =>
  $fetch(`${config.public.baseURL}/api/products?populate=*`)
);
</script>
<template>
  <div class="grid grid-cols-4 grid-flow-row pb-10 w-full gap-2">
    <ProductCard
      :size="'small'"
      :product="product"
      v-for="product in products.data"
    />
  </div>
</template>
