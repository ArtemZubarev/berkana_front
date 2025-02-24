<script setup lang="ts">
const { min, max } = defineProps<{
  min?: number;
  max?: number;
}>();
const emit = defineEmits<{
  change: [minPrice: number, maxPrice: number];
}>();
</script>

<template>
  <div class="mt-5">
    <span class="text-gray-600">Цена:</span>
    <div class="list flex flex-row items-center gap-2">
      <CommonInput
        :value="min"
        :label="''"
        :type="'number'"
        :placeholder="'Мин.'"
        class="max-w-[100px]"
      />

      -
      <CommonInput
        :value="max"
        :label="''"
        :type="'number'"
        :placeholder="'Макс.'"
        class="max-w-[100px]"
      />
    </div>
  </div>
</template>

<style>
.category.active {
  font-weight: bold;
}
</style>
