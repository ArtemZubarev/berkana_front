<template>
  <div
    class="mx-auto flex max-w-screen-2xl items-center justify-between py-0 px-2 lg:px-8 overflow-hidden relative"
  >
    <img class="banner-pic rounded-2xl" src="/public/girl.jpg" alt="" />
    <h1
      class="absolute text-white font-thin text-4xl md:text-8xl mx-5 bottom-32"
    >
      Домашний <br />льняной текстиль
    </h1>
    <NuxtLink
      class="buttton absolute bottom-8 text-white text-sm px-5 py-2 mx-5 border border-2 rounded-full uppercase hover:opacity-80"
      to="/catalog"
    >
      В каталог
    </NuxtLink>
  </div>
</template>

<style>
.banner-pic {
  height: calc(100vh - 90px);
  width: 100%;
  object-fit: cover;
}
</style>
