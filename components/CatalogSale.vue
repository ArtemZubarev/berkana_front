<script setup lang="ts">
const { value } = defineProps<{
  value: any;
}>();
const emit = defineEmits<{
  change: [value: any];
}>();
const handleChange = (e) => {
  emit("change", e.target.checked);
};
</script>

<template>
  <div class="flex items-center mt-10">
    <input
      :checked="value"
      id="checked-checkbox"
      type="checkbox"
      value=""
      class="w-5 h-5 accent-red-500 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
      @change="handleChange"
    />
    <label
      for="checked-checkbox"
      class="ms-2 text-sm font-medium dark:text-gray-300"
      >SALE</label
    >
  </div>
</template>
