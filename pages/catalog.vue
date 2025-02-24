<script setup lang="ts">
import type { StrapiResponse } from "~/composables/useStrapi";

const config = useRuntimeConfig();

const route = useRoute();
const router = useRouter();
const parsedQuery = route.query;
const filters: any = ref({
  category: parsedQuery.category,
  color: parsedQuery.color,
  sale: parsedQuery.sale,
  minPrice: parsedQuery.minPrice,
  maxPrice: parsedQuery.maxPrice,
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
      ...(filters.value.sale === "true"
        ? {
            price: {
              discount_price: {
                $notNull: true,
              },
            },
          }
        : []),
    },

    populate: "*",
  });

const { fetchStrapi } = useStrapi();
const { data, refresh } = await useAsyncData<StrapiResponse>(
  "catalog products",
  () => fetchStrapi(`/api/products?${apiQuery()}`)
);

const changeCategory = (slug: string) => {
  router.push({
    query: { ...route.query, category: slug },
  });
};
const changeColor = (slug: string) => {
  router.push({
    query: { ...route.query, color: slug },
  });
};
const changePrice = (minPrice: number, maxPrice: number) => {
  router.push({
    query: { ...route.query, minPrice, maxPrice },
  });
};
const changeSale = (value) => {
  if (value) {
    router.push({
      query: { ...route.query, sale: "true" },
    });
  } else {
    const { sale, ...rest } = route.query;
    router.push({
      query: rest,
    });
  }
};
const dropFilters = () => {
  router.push({
    query: {},
  });
};

watch(
  () => route.query,
  (newQuery) => {
    filters.value = {
      ...newQuery,
    };
    refresh();
  }
);
</script>

<template>
  <div
    class="mx-auto max-w-screen-2xl items-center justify-between py-0 px-2 lg:px-8 overflow-hidden relative"
  >
    <h2 class="text-6xl">Каталог</h2>
    <div class="lg:flex gap-2">
      <div class="filters min-w-80 pt-8">
        <CatalogCategories
          :currentValue="filters.category"
          @change="changeCategory"
        />
        <CatalogColors :currentValue="filters.color" @change="changeColor" />
        <CatalogSale :value="filters.sale" @change="changeSale" />
        <CatalogPriceRange
          :min="filters.minPrice"
          :maxPrice="filters.maxPrice"
          @change="changePrice"
        />
      </div>
      <div
        v-if="data!.data.length"
        class="products grid grid-cols-2 lg:grid-cols-3 grid-flow-row mt-10 w-full gap-8"
      >
        <ProductCard
          v-for="product in data!.data"
          :size="'medium'"
          :product="product"
          :key="product.documentId"
        />
      </div>
      <div
        class="flex flex-col w-full border border-1 border-gray-300 rounded-md items-center justify-center"
        v-else
      >
        <p class="text-gray-400 text-3xl">
          По вашему запросу мы ничего не нашли :(
        </p>
        <button
          @click="dropFilters"
          class="mt-4 flex items-center text-white hover:text-gray-800 border border-gray-500 bg-gray-500 hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Сбросить фильтры
        </button>
      </div>
    </div>
  </div>
</template>
