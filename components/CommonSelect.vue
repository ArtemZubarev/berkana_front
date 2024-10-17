<script setup lang="ts">
const { label } = defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="w-full max-w-sm max-w-[140px]">
    <label class="text-gray-500" for="">{{ label }}:</label>
    <div class="relative">
      <select
        class="w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border border-gray-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
      >
        <option value="brazil">15х80</option>
        <option value="bucharest">30х80</option>
        <option value="london">40х80</option>
        <option value="washington">50х80</option>
      </select>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.2"
        stroke="currentColor"
        class="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-gray-700"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
        />
      </svg>
    </div>
  </div>
</template>
