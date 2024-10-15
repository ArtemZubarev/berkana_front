<script setup lang="ts">
const config = useRuntimeConfig();
const baseUrl = config.public.baseURL;
const { id } = useRoute().params;
const { data, error }: any = await useAsyncData("product", () =>
  $fetch(`${config.public.baseURL}/api/products/${id}?populate=*`)
);
// const picture = `${config.public.baseUrl}${data.data.preview.formats.large.url}`;
</script>

<template>
  <div class="product categories max-w-screen-2xl p-6 lg:px-8">
    <div class="box w-1/2">
      <img
        class=""
        :src="`${baseUrl}${data.data.preview.formats.large.url}`"
        alt=""
      />
      <img
        class=""
        :src="`${baseUrl}${data.data.preview.formats.large.url}`"
        alt=""
      />
      <img
        class=""
        :src="`${baseUrl}${data.data.preview.formats.large.url}`"
        alt=""
      />
      <img
        class=""
        :src="`${baseUrl}${data.data.preview.formats.large.url}`"
        alt=""
      />
      <img
        class=""
        :src="`${baseUrl}${data.data.preview.formats.large.url}`"
        alt=""
      />
    </div>
    <div
      class="infoBox ml-1/2 w-1/2 pr-10 sticky bottom-0 right-0 min-h-screen"
    >
      <h1 class="productName text-3xl">{{ data.data.name }}</h1>
      <div class="price pt-6 text-2xl font-semibold">
        {{ data.data.price[0].price }}
        <span>руб.</span>
      </div>
      <p class="productDescription pt-4 text-sm w-3/4">
        {{ data.data.description }}
      </p>
    </div>
  </div>
</template>

<style>
.infoBox {
  margin-left: 50%;
}
</style>
