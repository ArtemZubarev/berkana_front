<script setup lang="ts">
const config = useRuntimeConfig();
const { data } = await useAsyncData("products", () =>
  $fetch(`${config.public.baseURL}/api/products?populate=*`)
);
const filters = ref({
  categoryId: "wwrd6s9g2nb8amix49v0kys4",
  colorId: "hea9phk6kyggqp3p6iaj18yl",
});
const changeCategory = (id: string) => {
  filters.value.categoryId = id;
};
const changeColor = (id: string) => {
  filters.value.colorId = id;
};
</script>
<template>
  <div
    class="mx-auto max-w-screen-2xl items-center justify-between py-0 px-2 lg:px-8 overflow-hidden relative"
  >
    <h2 class="text-6xl">Каталог</h2>
    <div class="flex">
      <div class="filters min-w-80 pt-8">
        <CatalogCategories
          :currentValue="filters.categoryId"
          @change="changeCategory"
        />
        <CatalogColors :currentValue="filters.colorId" @change="changeColor" />
      </div>
      <div class="products grid grid-cols-3 grid-flow-row mt-10 w-full gap-8">
        <ProductCard
          :size="'medium'"
          :product="product"
          v-for="product in data.data"
        />
      </div>
    </div>
  </div>
</template>
