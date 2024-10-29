<script setup lang="ts">
const { value } = defineProps<{
  value: number;
}>();
const emit = defineEmits<{
  update: [qty: number];
}>();
const increase = () => {
  emit("update", value + 1);
};
const decrease = () => {
  emit("update", value - 1);
};
</script>

<template>
  <div class="custom-number-input h-10 w-[100px]">
    <div
      class="flex flex-row h-8 w-full rounded-lg relative bg-transparent mt-1"
    >
      <button
        @click="decrease"
        data-action="decrement"
        class="bg-white text-gray-600 hover:text-white hover:bg-gray-200 h-full w-20 rounded-l cursor-pointer outline-none"
      >
        <span class="m-auto text-2xl font-normal">−</span>
      </button>
      <div
        class="outline-none focus:outline-none text-center w-full bg-white border-gray-200 border font-normal text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center justify-center text-gray-700 outline-none"
        name="custom-input-number"
      >
        {{ value }}
      </div>
      <button
        @click="increase"
        data-action="increment"
        class="bg-300 text-gray-600 hover:text-white hover:bg-gray-200 h-full w-20 rounded-r cursor-pointer"
      >
        <span class="m-auto text-2xl font-normal">+</span>
      </button>
    </div>
  </div>
</template>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.custom-number-input input:focus {
  outline: none !important;
}

.custom-number-input button:focus {
  outline: none !important;
}
</style>
