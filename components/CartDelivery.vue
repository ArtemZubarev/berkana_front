<script setup lang="ts">
interface Slots {
  default?: (props: {}) => any;
}
interface Props {
  isLoading: boolean;
}
const { isLoading } = defineProps<{ isLoading: boolean }>();

defineSlots<Slots>();
const emit = defineEmits<{
  goToPayment: [form: object];
}>();

const form = reactive({
  fullName: "Darth Vader",
  phone: "+712313123",
  mail: "asdasd@asdas.as",

  delivery: {
    city: "Kirov",
    street: "Lenina",
    house: "13",
    apartment: "300",
    entrance: "4",
    floor: "27",
    domofon: "300",
    comment: "",
  },
});
const handlePay = () => {
  emit("goToPayment", form);
};
</script>

<template>
  <div class="cartDelivery mt-20">
    <h1 class="text-2xl">Контактные данные</h1>
    <div
      class="box mt-6 grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-5 lg:max-w-[60%]"
    >
      <CommonInput
        :value="form.fullName"
        :label="'ФИО'"
        :placeholder="'Иванов Иван Иванович'"
        :required="true"
      />
      <CommonInput
        :value="form.phone"
        :label="'Телефон'"
        :placeholder="'+7 123 456-78-90'"
        :required="true"
      />
      <CommonInput
        :value="form.mail"
        :label="'Email'"
        :type="'email'"
        :required="true"
      />
    </div>
    <h1 class="text-2xl mt-14">Адрес доставки</h1>
    <div
      class="box grid grid-cols-2 lg:grid-cols-3 gap-5 lg:max-w-[60%] mt-8 mb-10"
    >
      <CommonInput
        :value="form.delivery.city"
        :label="'Город'"
        :required="true"
      />
      <CommonInput
        :value="form.delivery.street"
        :label="'Улица'"
        :required="true"
      />

      <div class="hidden lg:block"></div>
      <div class="box grid grid-cols-2 gap-5">
        <CommonInput
          :value="form.delivery.house"
          :label="'Дом'"
          :required="true"
        />
        <CommonInput
          :value="form.delivery.apartment"
          :label="'Квартира/Офис'"
          :required="true"
        />
      </div>
      <div class="box grid grid-cols-2 gap-5">
        <CommonInput :value="form.delivery.entrance" :label="'Подъезд'" />
        <CommonInput :value="form.delivery.floor" :label="'Этаж'" />
      </div>
      <div class="hidden lg:block"></div>
      <CommonTextarea
        class="col-span-2"
        :value="form.delivery.comment"
        :label="'Комментарии к заказу'"
      />
    </div>

    <slot />
    <div class="flex items-center gap-2">
      <button
        :disabled="isLoading"
        class="mt-4 flex items-center text-white hover:text-gray-800 border border-gray-800 bg-gray-800 hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        @click="handlePay"
      >
        <nuxt-icon name="card" class="card" />
        Перейти к оплате
      </button>
      <LoaderSpinner class="mt-2" v-if="isLoading" />
    </div>
    <p class="disclaimer text-sm text-gray-400 mt-4">
      Нажимая на кнопку, вы даёте согласие на обработку персональных данных,<br />
      соглашаетесь с{{ " " }}
      <a
        class="text-gray-700 underline hover:opacity-70"
        target="_blank"
        href="/docs/policy_berkana.pdf"
        >политикой конфиденциальности</a
      >
      и
      <a
        class="text-gray-700 underline hover:opacity-70"
        target="_blank"
        href="/docs/oferta_berkana.pdf"
        >офертой</a
      >.
    </p>
  </div>
</template>

<style>
.card svg {
  margin-top: 3px;
  margin-right: 8px;
}
</style>
