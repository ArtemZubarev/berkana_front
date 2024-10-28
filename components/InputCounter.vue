<script setup lang="ts">

</script>

<template>
  <div class="custom-number-input h-10 w-[100px]">
    <!-- <label for="custom-input-number" class="w-full text-gray-700 text-sm font-semibold">
      Counter Input
    </label> -->
    <div class="flex flex-row h-8 w-full rounded-lg relative bg-transparent mt-1">
      <button data-action="decrement" class=" bg-white text-gray-600 hover:text-white hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
        <span class="m-auto text-2xl font-thin">−</span>
      </button>
      <input type="number" class="outline-none focus:outline-none text-center w-full bg-white border-gray-400 border font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value="0"></input>
      <button data-action="increment" class="bg-300 text-gray-600 hover:text-white hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
        <span class="m-auto text-2xl font-thin">+</span>
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
