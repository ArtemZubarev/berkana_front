<script setup lang="ts">
const { label, currentValue, options } = defineProps<{
  label: string;
  valueName: string;
  currentValue?: any;
  options: any[];
}>();
const emit = defineEmits<{
  change: [option: any]; // named tuple syntax
}>();
const test = (e: any) => {
  emit("change", e.target.value);
};
</script>

<template>
  <div class="w-full max-w-sm max-w-[140px]">
    <label class="text-gray-500" for="">{{ label }}:</label>
    <div class="relative">
      <select
        :value="currentValue"
        @change="test($event)"
        class="w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border border-gray-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
      >
        <option
          :value="option[valueName]"
          :selected="test === option[valueName]"
          v-for="option in options"
        >
          {{ option.size }}
        </option>
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
