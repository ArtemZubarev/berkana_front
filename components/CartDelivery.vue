<script setup lang="ts">
interface Slots {
  default?: (props: {}) => any;
}
defineSlots<Slots>();
const form = reactive({
  fio: "",
  phone: "",
  email: "",

  city: "",
  street: "",
  house: "",
  apartment: "",
  entrance: "",
  floor: "",
  domofon: "",
  comment: "",
});
</script>

<template>
  <form class="cartDelivery mt-20">
    <h1 class="text-2xl">Контактные данные</h1>
    <div
      class="box mt-6 grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-5 lg:max-w-[60%]"
    >
      <CommonInput
        :value="form.fio"
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
        :value="form.email"
        :label="'Email'"
        :type="'email'"
        :required="true"
      />
    </div>
    <h1 class="text-2xl mt-14">Адрес доставки</h1>
    <div
      class="box grid grid-cols-2 lg:grid-cols-3 gap-5 lg:max-w-[60%] mt-8 mb-10"
    >
      <CommonInput :value="form.city" :label="'Город'" :required="true" />
      <CommonInput :value="form.street" :label="'Улица'" :required="true" />

      <div class="hidden lg:block"></div>
      <div class="box grid grid-cols-2 gap-5">
        <CommonInput :value="form.house" :label="'Дом'" :required="true" />
        <CommonInput
          :value="form.apartment"
          :label="'Квартира/Офис'"
          :required="true"
        />
      </div>
      <div class="box grid grid-cols-2 gap-5">
        <CommonInput :value="form.entrance" :label="'Подъезд'" />
        <CommonInput :value="form.floor" :label="'Этаж'" />
      </div>
      <div class="hidden lg:block"></div>
      <CommonTextarea
        class="col-span-2"
        :value="form.comment"
        :label="'Комментарии к заказу'"
      />
    </div>
    <slot />
    <p class="disclaimer text-sm text-gray-400 mt-4">
      Нажимая на кнопку, вы даёте согласие на обработку персональных данных и<br />
      соглашаетесь с{{ " " }}
      <a
        class="text-gray-700 underline hover:opacity-70"
        target="_blank"
        href="/docs/policy_berkana.pdf"
        >политикой конфиденциальности</a
      >
    </p>
  </form>
</template>
<style>
.card svg {
  margin-top: 3px;
  margin-right: 8px;
}
</style>
