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
    link: "/delivery_and_payment",
    name: "Доставка и оплата",
  },
  {
    link: "/contacts",
    name: "Контакты",
  },
  {
    link: "/catalog?sale=true",
    name: "SALE",
  },
];
const mobileMenuOpen = ref(false);
const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// const cart = useCookie("cart");
// const cartItems = ref(cart.value.length);
// provide("cartQuantity", cartItems);
const { cartQty } = inject("cartQty");
</script>

<template>
  <header class="relative mb-10">
    <nav
      class="nav md:flex mx-auto flex max-w-screen-2xl items-center justify-between p-6 lg:px-8"
    >
      <div class="flex lg:flex-1">
        <NuxtLink
          to="/"
          class="-m-1.5 p-1.5 font-bold text-gray-700 flex items-center justify-center gap-1"
        >
          <svg
            class="w-8 text-deep-purple-accent-400"
            viewBox="0 0 24 24"
            stroke-linejoin="round"
            stroke-width="2"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke="currentColor"
            fill="none"
          >
            <rect x="3" y="1" width="7" height="12"></rect>
            <rect x="3" y="17" width="7" height="6"></rect>
            <rect x="14" y="1" width="7" height="6"></rect>
            <rect x="14" y="11" width="7" height="12"></rect>
          </svg>
          <span>BERKANA</span>
        </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="toggleMenu"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
          <!-- <Bars3Icon class="h-6 w-6" aria-hidden="true" /> -->
        </button>
      </div>
      <ul
        class="hidden lg:flex flex-col p-4 md:p-0 mt-4 font-medium font-normal border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
      >
        <li
          class="font-manrope text-sm text-gray-800 hover:text-gray-500"
          :class="{ 'text-red-700': item.name === 'SALE' }"
          v-for="item in menu"
        >
          <NuxtLink :to="item.link">{{ item.name }}</NuxtLink>
        </li>
      </ul>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <NuxtLink
          to="/cart"
          class="text-sm font-normal leading-6 text-gray-900"
        >
          Корзина
          <sup aria-hidden="true">({{ cartQty }})</sup>
        </NuxtLink>
      </div>
    </nav>
    <Transition name="slide">
      <div
        v-if="mobileMenuOpen"
        class="flex items-center w-full absolute top-[100%] left-0 w-full bg-white z-10 shadow-lg"
      >
        <ul
          class="flex w-full justify-center flex-row p-4 font-medium font-normal gap-2 rtl:space-x-reverse dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li
            class="font-manrope text-sm text-gray-800 hover:text-gray-500"
            :class="{ 'text-red-700': item.name === 'SALE' }"
            @click="toggleMenu"
            v-for="item in menu"
          >
            <NuxtLink :to="item.link">{{ item.name }}</NuxtLink>
          </li>
          <li class="font-manrope text-sm text-gray-800 hover:text-gray-500">
            <NuxtLink to="/cart" class="text-sm font-normal text-gray-900">
              Корзина
              <sup aria-hidden="true">({{ cartQty }})</sup>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.nav {
  & > * {
    /* flex: 1 1 0px; */
  }
}
.router-link-active {
  font-weight: bold;
}
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  /* transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1); */
  transition: all 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
