<script setup lang="ts">
const { currentValue } = defineProps<{
  currentValue: string;
}>();
const emit = defineEmits<{
  change: [id: string]; // named tuple syntax
}>();
const config = useRuntimeConfig();
const { data } = await useAsyncData("colors", () =>
  $fetch(`${config.public.baseURL}/api/colors`)
);
const colors = {
  Серый: "bg-gray-300",
  Красный: "bg-red-500	",
  Синий: "bg-blue-300	",
  Розовый: "bg-rose-200	",
  Белый: "bg-white-500	",
  Черный: "bg-slate-600	",
};
</script>

<template>
  <div class="filterColors mt-10">
    <p>цвет</p>
    <div class="flex gap-2">
      <button
        :class="[
          'color',
          'rounded-full',
          'w-7',
          'h-7',
          'border-2',
          'border-slate-100',
          colors[color.name],
          { active: currentValue === color.documentId },
        ]"
        v-for="color in data.data"
        @click="$emit('change', color.documentId)"
      ></button>
    </div>
  </div>
</template>

<style>
.color.active {
  box-shadow: 0 0 0 2px rgb(55, 65, 81);
}
</style>
