<script setup lang="ts">
const config = useRuntimeConfig();
const baseUrl = config.public.baseURL;
const { product } = defineProps(["product"]);
const picture = `${baseUrl}${product.preview.formats.large.url}`;
const linkUrl = `/products/${product.documentId}`;
</script>

<template>
  <NuxtLink :to="linkUrl" class="product">
    <div class="img-container rounded-2xl overflow-hidden">
      <img class="" :src="picture" alt="" />
    </div>
    <div class="info flex justify-between mt-4">
      <div class="name font-medium">{{ product.name }}</div>
      <div class="price font-thin">
        {{ product.price[0].price }} <span>р.</span>
      </div>
    </div>
  </NuxtLink>
</template>
