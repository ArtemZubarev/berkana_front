<script setup lang="ts">
import type { LocationQueryValue } from "vue-router";

const { currentValue } = defineProps<{
  currentValue: string | LocationQueryValue | LocationQueryValue[] | null;
}>();
const emit = defineEmits<{
  change: [id: string]; // named tuple syntax
}>();
const config = useRuntimeConfig();
const { data } = await useAsyncData("categories", () =>
  $fetch(`${config.public.baseURL}/api/categories`)
);
</script>

<template>
  <div class="list flex flex-col">
    <button
      @click="$emit('change', 'all')"
      class="category cursor-pointer hover:opacity-0.5 text-left"
      :class="[{ active: currentValue === 'all' }]"
    >
      Все
    </button>
    <button
      @click="$emit('change', category.slug)"
      class="category cursor-pointer hover:opacity-0.5 text-left"
      :class="[{ active: currentValue === category.slug }]"
      :key="category.slug"
      v-for="category in data.data"
    >
      {{ category.name }}
    </button>
  </div>
</template>

<style>
.category.active {
  font-weight: bold;
}
</style>
