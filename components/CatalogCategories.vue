<script setup lang="ts">
const { currentValue } = defineProps<{
  currentValue: string;
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
  <div class="list">
    <div
      @click="$emit('change', category.slug)"
      class="category cursor-pointer hover:opacity-0.5"
      :class="[{ active: currentValue === category.slug }]"
      :key="category.slug"
      v-for="category in data.data"
    >
      {{ category.name }}
    </div>
  </div>
</template>

<style>
.category.active {
  font-weight: bold;
}
</style>
