<script setup lang="ts">
import { find, pathOr, propEq } from "rambda";
import { toast } from "vue3-toastify";
import type { StrapiResponse } from "~/composables/useStrapi";
import { register } from "swiper/element/bundle";
import "swiper/css";
register();

const config = useRuntimeConfig();
const baseUrl = config.public.baseURL;
const { id } = useRoute().params;
const { fetchStrapi } = useStrapi();
const { data, meta }: StrapiResponse = await useAsyncData<StrapiResponse>(
  "product",
  () => fetchStrapi(`/api/products/${id}?populate=*`)
);

const currentSize = ref(data.value.data.price[0].size);

const changeSize = (option: any) => {
  currentSize.value = option;
};
const currentPrice = computed(() => {
  const priceObj = find(propEq(currentSize.value, "size"))(
    data.value.data.price
  );

  return pathOr("Цена не указана", ["price"], priceObj);
});
const discountPrice = computed(() => {
  const priceObj = find(propEq(currentSize.value, "size"))(
    data.value.data.price
  );

  return pathOr("", ["discount_price"], priceObj);
});

const { cartQty, refreshQty } = inject("cartQty") as any;

const isInCart = computed(() => {
  console.log(cartQty.value);

  return cartHasId(id as string, currentSize.value);
});

const dropInCart = () => {
  toCart({
    id: data.value.data.documentId,
    size: currentSize.value,
  });
  refreshQty();

  toast.info("Добавлено в корзину!", { autoClose: 1000 });
};
</script>

<template>
  <div
    class="flex max-w-[100%] flex-col lg:block product categories lg:max-w-screen-3xl p-6 lg:px-8"
  >
    <div class="box order-2 lg:w-1/2">
      <img
        class=""
        :src="`${baseUrl}${data.data.preview.formats.medium.url}`"
        alt=""
      />
      <img
        class=""
        :src="`${baseUrl}${data.data.preview.formats.medium.url}`"
        alt=""
      />
      <img
        class=""
        :src="`${baseUrl}${data.data.preview.formats.medium.url}`"
        alt=""
      />
      <img
        class=""
        :src="`${baseUrl}${data.data.preview.formats.medium.url}`"
        alt=""
      />
      <img
        class=""
        :src="`${baseUrl}${data.data.preview.formats.medium.url}`"
        alt=""
      />
    </div>
    <div
      class="infoBox mb-10 lg:mb-0 lg:ml-[50%] lg:w-1/2 pr-10 lg:sticky bottom-0 right-0 lg:min-h-screen pt-0"
    >
      <h1 class="productName text-3xl mb-5 text-gray-800">
        {{ data.data.name }}
      </h1>

      <CommonSelect
        :label="'Размер'"
        :valueName="'size'"
        :currentValue="currentSize"
        :options="data.data.price"
        @change="changeSize"
      />
      <div class="flex mb-4 pt-6">
        <div class="price text-2xl font-semibold text-gray-700 relative">
          {{ currentPrice }}
          <span v-if="currentPrice !== 'Цена не указана'">руб.</span>
          <span class="block line bg-red-700" v-if="discountPrice"></span>
        </div>
        <div
          v-if="discountPrice"
          class="price ml-2 text-1xl font-bold text-red-700"
        >
          {{ discountPrice }}
          <span>руб.</span>
        </div>
      </div>

      <div
        v-if="isInCart"
        class="inline-block bg-white border-gray-300 cursor-default text-gray-800 border focus:ring-4 outline-none focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        :key="'in'"
      >
        В корзине
      </div>
      <button
        v-else-if="!isInCart"
        :key="'notIn'"
        @click="dropInCart"
        type="button"
        class="text-white hover:text-gray-800 border border-gray-800 bg-gray-800 hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        В корзину
      </button>

      <p class="productDescription pt-4 text-sm w-3/4 text-gray-500">
        {{ data.data.description }}
      </p>
      <h2 class="text-xl hidden lg:block mb-5 text-gray-800 mt-10">
        Похожие продукты:
      </h2>
      <ProductSimilar />
    </div>
  </div>
</template>

<style scoped>
/* .infoBox {
  margin-left: 50%;
} */
.line {
  height: 3px;
  top: 14px;
  width: 50%;
  position: absolute;
  transform: rotate(-18deg);
}
</style>
