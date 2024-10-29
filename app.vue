<script setup lang="ts">
import { countItemsInCart } from "./utils/cart";

// You might choose this based on an API call or logged-in status
const layout = "default";

const cartQty = ref(countItemsInCart());

const refreshQty = () => {
  cartQty.value = countItemsInCart();
};
provide("cartQty", {
  cartQty,
  refreshQty,
});
</script>

<template :name="layout">
  <div class="">
    <!-- <NuxtLoadingIndicator /> -->
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
:root {
  /* --toastify-color-success: #fff;
  --toastify-text-color-success: rgb(55, 65, 81); */
}
</style>
