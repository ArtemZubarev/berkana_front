<script setup lang="ts">
import { find, propEq } from "rambda";

const { product, productDetails } = defineProps<{
  product: any;
  productDetails: any;
}>();

const emit = defineEmits<{
  remove: [i: string, size: string];
  updateQtty: [i: string, size: string, qty: number];
}>();

const config = useRuntimeConfig();
const baseUrl = config.public.baseURL;

const productImg = computed(() => {
  if (productDetails) {
    return `${baseUrl}${productDetails.preview.formats.thumbnail.url}`;
  }
  return "";
});
const sizeDetails = (size: any) => {
  const obj: any = find(propEq(size, "size"))(productDetails.price);
  return obj;
};
const deleteProduct = (id: string, size: string) => {
  emit("remove", id, size);
};
const updateQtty = (id: string, size: string, qty: number) => {
  if (qty === 0 || qty < 0) {
    emit("remove", id, size);
  } else {
    updateQuantity(id, size, qty);
  }
};
</script>

<template>
  <div class="product flex items-start justify-between max-w-[50%] py-2">
    <div class="productImg rounded-md overflow-hidden border-4 border-gray-200">
      <img
        class="object-cover w-[50px] h-[50px]"
        :src="productImg"
        :alt="product.name"
      />
    </div>
    <div class="productName grow pl-5 pt-4 max-w-[230px]">
      <NuxtLink
        class="hover:underline"
        :to="`/products/${productDetails.documentId}`"
      >
        {{ productDetails.name }}
      </NuxtLink>
    </div>
    <div class="sizes">
      <SizeItem
        :product="product"
        :productDetails="productDetails"
        :sizeDetails="sizeDetails(index)"
        :quantity="size.quantity"
        @updateQtty="updateQtty"
        @remove="deleteProduct"
        v-for="(size, index) in product"
      />
    </div>
  </div>
</template>
