<script setup lang="ts">
useHead({
  title: "Berkana | Домашний льняной текстиль",
  meta: [
    {
      name: "description",
      content: `BERKANA - это собственное производство по пошиву льняного текстиля для взрослых и малышей.
Для своих изделий мы выбираем ткани только от проверенных поставщиков.
Также наше белье протестировано лабораторией и имеет сертификат ЕАЭС, который свидетельствует о стандарте качества и безопасности.

Шьём с любовью и заботой о близких.

У нас вы можете найти готовые изделия и на заказ по вашим размерам:
- постельное белье и пледы для взрослых и малышей
- халаты для мужчин и женщин
- скатерти, салфетки, полотенца

Мы шьём изделия на заказ в рамках нашей ассортиментной линейки. Будем рады осуществить ваши идеи!
`,
    },
  ],
});
</script>

<template>
  <div>
    <HomeBanner />
    <HomePopular />
    <!-- <HomePersonal />
    <HomeAbout /> -->
    <HomeCategories />
    <HomeIndividual />
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
  </div>
</template>
