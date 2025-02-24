<script setup lang="ts">
const { product, productDetails, sizeDetails, quantity } = defineProps<{
  product: any;
  productDetails: any;
  sizeDetails: any;
  quantity: number;
}>();
const emit = defineEmits<{
  remove: [i: string, size: string];
  updateQtty: [i: string, size: string, qty: number];
}>();
const updateQuantity = (qty: number) => {
  emit("updateQtty", productDetails.documentId, sizeDetails.size, qty);
};
</script>

<template>
  <div class="size grid grid-cols-4 items-center justify-between pt-2">
    <div class="productSize font-thin text-gray-500 text-size-200 text-sm">
      {{ sizeDetails.size }}
    </div>
    <div class="productQty">
      <InputCounter @update="updateQuantity" :value="quantity" />
    </div>
    <div class="productPrice text-right relative">
      <span class="normalPrice font-thin relative block text-gray-700">
        {{ sizeDetails.price * quantity }} р
        <span
          class="block line bg-red-700"
          v-if="sizeDetails.discount_price"
        ></span>
      </span>
      <span
        v-if="sizeDetails.discount_price"
        class="discountPrice text-sm font-bold text-red-700 absolute top-[-16px] right-[-7px]"
      >
        {{ sizeDetails.discount_price * quantity }}
      </span>
    </div>
    <div class="productDel ml-10">
      <button
        @click="
          $emit('remove', productDetails.documentId, `${sizeDetails.size}`)
        "
        class="delete opacity-50 hover:opacity-30"
      >
        <nuxt-icon name="delete" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.line {
  height: 2px;
  top: 14px;
  right: 0;
  width: 50%;
  position: absolute;
  transform: rotate(18deg);
}
</style>
