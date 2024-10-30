<script setup lang="ts">
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
    <h1 class="text-2xl">доставка</h1>
    <div class="box mt-6 grid grid-cols-3 gap-5 max-w-[60%]">
      <CommonInput
        :value="form.fio"
        :label="'ФИО'"
        :placeholder="'Иванов Иван Иванович'"
      />
      <CommonInput
        :value="form.phone"
        :label="'Телефон'"
        :placeholder="'+7 123 456-78-90'"
      />
      <CommonInput :value="form.email" :label="'Email'" :type="'email'" />
    </div>
    <div class="box grid grid-cols-3 gap-5 max-w-[60%] mt-16 mb-10">
      <CommonInput :value="form.city" :label="'Город'" />
      <CommonInput :value="form.street" :label="'Улица'" />

      <div class=""></div>
      <div class="box grid grid-cols-2 gap-5">
        <CommonInput :value="form.house" :label="'Дом'" />
        <CommonInput :value="form.apartment" :label="'Квартира/Офис'" />
      </div>
      <div class="box grid grid-cols-2 gap-5">
        <CommonInput :value="form.entrance" :label="'Подъезд'" />
        <CommonInput :value="form.floor" :label="'Этаж'" />
      </div>
      <div class=""></div>
      <CommonTextarea
        class="col-span-2"
        :value="form.comment"
        :label="'Комментарии к заказу'"
      />
    </div>
    <CartTotal />
    <button
      class="mt-4 flex items-center text-white hover:text-gray-800 border border-gray-800 bg-gray-800 hover:bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      type="submit"
    >
      <nuxt-icon name="card" class="card" />
      Перейти к оплате
    </button>
    <p class="disclaimer text-sm text-gray-400 mt-4">
      Нажимая на кнопку, вы даёте согласие на обработку персональных данных и<br />
      соглашаетесь с{{ " " }}
      <a
        class="text-gray-700 underline hover:opacity-70"
        target="_blank"
        href=""
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
