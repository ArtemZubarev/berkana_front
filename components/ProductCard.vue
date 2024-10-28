<script setup lang="ts">
import { find, prop } from "rambda";

const { product, size } = defineProps<{
  product: any;
  size: "large" | "small" | "medium" | "thumbnail";
}>();

const config = useRuntimeConfig();
const baseUrl = config.public.baseURL;

const picture = `${baseUrl}${product.preview.formats[size].url}`;
const linkUrl = `/products/${product.documentId}`;
const hideText = size == "thumbnail" || size == "small";
const hasSale = computed(() => {
  return !!find(prop("discount_price"))(product.price);
});
</script>

<template>
  <NuxtLink :to="linkUrl" class="card">
    <div class="relative img-container rounded-2xl overflow-hidden h-[495px]">
      <img class="productPhoto" :src="picture" alt="" />
      <span
        v-if="hasSale"
        class="bg-red-400 px-2 rounded-md absolute top-4 right-4 text-white font-thin text-sm"
        >SALE</span
      >
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
