<script setup>
import stringifyFilters from "~/utils/stringifyFilters";

const list = ref([
  {
    name: "постельное белье",
    slug: "bedsheets",
  },
  {
    name: "скатерти",
    slug: "tablecloths",
  },
  {
    name: "полотенца",
    slug: "towels",
  },
  {
    name: "салфетки",
    slug: "napkins",
  },
  {
    name: "пледы",
    slug: "blankets",
  },
]);

const categoryLink = (slug) => {
  const filters = stringifyFilters({
    category: slug,
  });
  return `/catalog?${filters}`;
};
</script>

<template>
  <div class="mx-auto categories max-w-screen-2xl p-6 lg:px-8">
    <h2 class="text-4xl md:text-4xl mt-10 text-gray-800">категории</h2>
    <div class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 lg:mt-4 gap-2">
      <NuxtLink
        :to="categoryLink(category.slug)"
        v-for="category in list"
        :key="category.slug"
        :class="[
          category.slug,
          'rounded-2xl',
          'overflow-hidden',
          'max-h-40',
          'lg:max-h-96',
        ]"
      >
        <div class="category">
          <img
            :src="'/catalog/' + category.slug + '.jpg'"
            alt=""
            class="categoryImage"
          />
          <p
            class="categoryName text-4xl lg:text-6xl font-thin text-white ml-5 top-3 absolute"
          >
            {{ category.name }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style>
.category {
  width: 100%;
  height: 100%;
  position: relative;

  &:hover {
    .categoryImage {
      transform: scale(1.02);
    }
    .categoryName {
      color: #eee8aa;
    }
  }
}
.categoryName {
  transition: 1.5s;
}
.categoryImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 1s;
}
@media (min-width: 1024px) {
  .bedsheets {
    grid-area: 1 / 1 / 2 / 4;
  }
  /* .tablecloth {
    grid-area: 1 / 3 / 2 / 3;
  } */
  .blankets {
    grid-area: 2 / 3 / 4 / 5;
  }
}
</style>
