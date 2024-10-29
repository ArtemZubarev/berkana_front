<script setup lang="ts">
const { value, label, placeholder } = defineProps<{
  value: string;
  label: string;
  placeholder?: string;
  type?: string;
}>();
const emit = defineEmits<{
  update: [qty: number];
}>();
</script>

<template>
  <div class="">
    <label
      for="base-input"
      class="block mb-1 text-sm font-thin font-medium text-gray-600 dark:text-white"
    >
      {{ label }}
    </label>
    <input
      :placeholder="placeholder"
      :value="value"
      :type="type ? type : 'text'"
      id="base-input"
      class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  </div>
</template>
