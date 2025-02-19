<script setup lang="ts">
import type { LocationQueryValue } from "vue-router";
import type { StrapiResponse } from "~/composables/useStrapi";

const { currentValue } = defineProps<{
  currentValue: string | LocationQueryValue | LocationQueryValue[] | null;
}>();
const emit = defineEmits<{
  change: [slug: string]; // named tuple syntax
}>();
const config = useRuntimeConfig();
const { fetchStrapi } = useStrapi();
const { data } = await useAsyncData<StrapiResponse>("colors", () =>
  fetchStrapi(`/api/colors`)
);

const colors = {
  gray: "bg-gray-300",
  red: "bg-red-500	",
  blue: "bg-blue-300	",
  pink: "bg-rose-200	",
  white: "bg-white-500	",
  black: "bg-slate-600	",
};
</script>

<template>
  <div class="filterColors mt-10">
    <div class="flex gap-2">
      <button
        :class="[
          'color',
          'rounded-full',
          'w-8',
          'h-8',
          'border-2',
          'border-slate-100',
          'all',

          'relative',
          { active: currentValue === 'all' },
        ]"
        @click="$emit('change', 'all')"
      >
        <span class="line one"></span>
        <span class="line two"></span>
      </button>
      <button
        v-for="color in data!.data"
        @click="$emit('change', color.slug)"
        :class="[
          'color',
          'rounded-full',
          'w-8',
          'h-8',
          'border-2',
          'border-slate-100',
          colors[color.slug as keyof typeof colors],
          { active: currentValue === color.slug },
        ]"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.color.active {
  box-shadow: 0 0 0 2px rgb(55, 65, 81);
}
.line {
  display: block;
  position: absolute;
  background: black;
  left: 1px;
  top: 13.5px;

  &.one {
    width: 26px;
    height: 1px;
    transform: rotate(45deg);
  }
  &.two {
    width: 26px;
    height: 1px;
    transform: rotate(-45deg);
  }
}
</style>
