<script setup lang="ts">
import { any, both, flip, gt, has, is, propSatisfies } from "rambda";

const { product, size } = defineProps<{
  product: any;
  size: "small" | "medium" | "thumbnail";
}>();

const config = useRuntimeConfig();
const baseUrl = config.public.baseURL;

const picture = `${baseUrl}${product.preview.formats[size].url}`;
const linkUrl = `/products/${product.documentId}`;
const hideText = size == "thumbnail" || size == "small";
// const hasSale = computed(() => {
//   return !!find(() => !!prop("discount_price") !== null)(product.price);
// });
const hasSale = computed(() => {
  return any(
    both(
      has("discount_price"),
      propSatisfies(both(is(Number), flip(gt)(0)), "discount_price")
    ),
    product.price
  );
});

const isNew = computed(() => product.is_new);
</script>

<template>
  <NuxtLink :to="linkUrl" class="card">
    <div
      class="relative img-container rounded-2xl overflow-hidden lg:h-[495px]"
    >
      <img class="productPhoto" :src="picture" alt="" />
      <div class="absolute top-4 right-4 flex gap-2">
        <span
          v-if="isNew"
          class="bg-green-300 px-2 rounded-md text-white font-thin text-sm"
          >NEW</span
        >
        <span
          v-if="hasSale"
          class="bg-red-400 px-2 rounded-md text-white font-thin text-sm"
          >SALE</span
        >
      </div>
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
