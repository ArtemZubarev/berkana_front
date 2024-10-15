<template>
  <header>
    <nav
      class="mx-auto flex max-w-screen-2xl items-center justify-between p-6 lg:px-8"
    >
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5 font-bold text-gray-700">
          BERKANA
        </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <!-- <Bars3Icon class="h-6 w-6" aria-hidden="true" /> -->
        </button>
      </div>
      <ul
        class="flex flex-col p-4 md:p-0 mt-4 font-medium font-normal border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
      >
        <li
          class="font-manrope text-sm text-gray-800 hover:text-gray-500"
          v-for="item in menu"
        >
          <NuxtLink :to="item.link">{{ item.name }}</NuxtLink>
          <!-- <NuxtLink to="/about">О нас</NuxtLink> -->
        </li>
      </ul>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <NuxtLink
          to="/cart"
          class="text-sm font-normal leading-6 text-gray-900"
        >
          Корзина
          <sup aria-hidden="true">({{ cartItems }})</sup>
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
const menu = [
  {
    link: "/catalog",
    name: "Каталог",
  },
  {
    link: "/about",
    name: "О нас",
  },
  {
    link: "/delivery",
    name: "Доставка",
  },
  {
    link: "/contacts",
    name: "Контакты",
  },
];
const mobileMenuOpen = ref(false);
const cartItems = ref(3);
</script>
