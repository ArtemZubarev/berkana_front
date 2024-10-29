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
      <CommonInput :value="form.city" :label="'Город'" />
      <CommonInput :value="form.street" :label="'Улица'" />
      <CommonInput :value="form.house" :label="'Дом'" />
      <CommonInput :value="form.apartment" :label="'Квартира/Офис'" />
      <CommonInput :value="form.entrance" :label="'Подъезд'" />
      <CommonInput :value="form.floor" :label="'Этаж'" />
      <CommonInput :value="form.domofon" :label="'Домофон'" />
      <CommonInput :value="form.comment" :label="'Комментарии к заказу'" />
    </div>
  </form>
</template>
