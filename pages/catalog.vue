<script setup lang="ts">
import type { StrapiResponse } from "~/composables/useStrapi";

const config = useRuntimeConfig();

const route = useRoute();
const router = useRouter();
const parsedQuery = route.query;
const filters = ref({
  category: parsedQuery.category,
  color: parsedQuery.color,
});

const apiQuery = () =>
  stringifyFilters({
    filters: {
      ...(filters.value.category !== "all"
        ? {
            category: {
              slug: {
                $eq: filters.value.category,
              },
            },
          }
        : []),
      ...(filters.value.color !== "all"
        ? {
            color: {
              slug: {
                $eq: filters.value.color,
              },
            },
          }
        : []),
      // ...filters.value,
    },
    populate: "*",
  });
const { fetchStrapi } = useStrapi();
const { data, refresh } = await useAsyncData<StrapiResponse>(
  "catalog products",
  () => fetchStrapi(`/api/products?${apiQuery()}`)
);

const changeCategory = (slug: string) => {
  filters.value.category = slug;
  router.push({
    query: filters.value,
  });
  refresh();
};
const changeColor = (slug: string) => {
  filters.value.color = slug;
  router.push({
    query: filters.value,
  });
  refresh();
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
          :currentValue="filters.category"
          @change="changeCategory"
        />
        <CatalogColors :currentValue="filters.color" @change="changeColor" />
      </div>
      <div class="products grid grid-cols-3 grid-flow-row mt-10 w-full gap-8">
        <ProductCard
          v-for="product in data!.data"
          :size="'medium'"
          :product="product"
          :key="product.documentId"
        />
      </div>
    </div>
  </div>
</template>
