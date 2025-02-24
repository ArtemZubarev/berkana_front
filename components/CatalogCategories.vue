<script setup lang="ts">
import type { LocationQueryValue } from "vue-router";
import type { StrapiResponse } from "~/composables/useStrapi";

const { currentValue } = defineProps<{
  currentValue: string | LocationQueryValue | LocationQueryValue[] | null;
}>();
const emit = defineEmits<{
  change: [id: string]; // named tuple syntax
}>();
const config = useRuntimeConfig();
const { fetchStrapi } = useStrapi();

const { data } = await useAsyncData<StrapiResponse>("categories", () =>
  fetchStrapi(`/api/categories`)
);
</script>

<template>
  <div class="list flex flex-col">
    <button
      @click="$emit('change', 'all')"
      class="category cursor-pointer hover:opacity-0.5 text-left p-1 pl-[15px] ml-[-15px] max-w-[240px]"
      :class="[
        ...(currentValue === 'all'
          ? [
              'transition',
              'duration-200',
              'shadow-md',
              'shadow-gray-500/15',
              'bg-gray-100',
              'rounded',
            ]
          : []),
      ]"
    >
      Все
    </button>
    <button
      @click="$emit('change', category.slug)"
      class="category cursor-pointer hover:opacity-0.5 text-left p-1 pl-[15px] ml-[-15px] max-w-[240px]"
      :class="[
        ...(currentValue === category.slug
          ? [
              'transition',
              'duration-200',
              'shadow-md',
              'shadow-gray-500/15',
              'bg-gray-100',
              'rounded',
            ]
          : []),
      ]"
      :key="category.slug"
      v-for="category in data?.data"
    >
      {{ category.name }}
    </button>
  </div>
</template>

<style>
.category.active {
  /* font-weight: bold; */
}
</style>
