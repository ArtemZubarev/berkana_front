<script setup lang="ts">
// You might choose this based on an API call or logged-in status
const layout = "default";

const cartQty = ref(getCart().length);
const refreshQty = () => {
  cartQty.value = getCart().length;
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
</style>
