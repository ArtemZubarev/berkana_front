<script setup lang="ts">
const config = useRuntimeConfig();
const baseUrl = config.public.baseURL;
const { product, size } = defineProps<{
  product: any;
  size: "large" | "small" | "medium" | "thumbnail";
}>();
const picture = `${baseUrl}${product.preview.formats[size].url}`;
const linkUrl = `/products/${product.documentId}`;
const hideText = size == "thumbnail" || size == "small";
</script>

<template>
  <NuxtLink :to="linkUrl" class="card">
    <div class="img-container rounded-2xl overflow-hidden">
      <img class="productPhoto" :src="picture" alt="" />
    </div>
    <div v-if="!hideText" class="info flex justify-between mt-4">
      <div class="name font-medium">{{ product.name }}</div>
      <div class="price font-thin">
        {{ product.price[0].price }} <span>р.</span>
      </div>
    </div>
  </NuxtLink>
</template>
<style scoped>
.card {
  &:hover {
    .productPhoto {
      transform: scale(1.04);
    }
  }
}
.productPhoto {
  transition: 1.5s;
}
</style>
