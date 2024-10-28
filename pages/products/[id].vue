<script setup lang="ts">
import { find, pathOr, propEq } from "rambda";
import { toast } from "vue3-toastify";

const config = useRuntimeConfig();
const baseUrl = config.public.baseURL;
const { id } = useRoute().params;
const { data, error }: any = await useAsyncData("product", () =>
  $fetch(`${config.public.baseURL}/api/products/${id}?populate=*`)
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

const { refreshQty } = inject("cartQty") as any;

const isInCart = ref(cartHasId(id as string));

const dropInCart = () => {
  toCart({
    id: data.value.data.documentId,
    size: currentSize.value,
  });
  refreshQty();
  isInCart.value = cartHasId(id as string);

  toast.info("Добавлено в корзину!", { autoClose: 1000 });
};
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
      class="infoBox ml-1/2 w-1/2 pr-10 sticky bottom-0 right-0 min-h-screen pt-0"
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

      <button
        class="bg-white border-gray-300 cursor-default text-gray-800 border focus:ring-4 outline-none focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        v-if="isInCart"
      >
        В корзине
      </button>
      <button
        v-else
        @click="dropInCart"
        type="button"
        class="text-white hover:text-gray-800 border border-gray-800 bg-gray-800 hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        В корзину
      </button>

      <p class="productDescription pt-4 text-sm w-3/4 text-gray-500">
        {{ data.data.description }}
      </p>
      <h2 class="text-xl mb-5 text-gray-800 mt-10">Похожие продукты:</h2>
      <ProductSimilar />
    </div>
  </div>
</template>

<style scoped>
.infoBox {
  margin-left: 50%;
}
.line {
  height: 3px;
  top: 14px;
  width: 50%;
  position: absolute;
  transform: rotate(-18deg);
}
</style>
