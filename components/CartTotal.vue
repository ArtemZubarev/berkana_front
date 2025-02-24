<script setup lang="ts">
const { sum } = defineProps<{
  sum: number;
  deliveryPrice: number;
  freeDeliveryMin: number;
}>();
</script>
<template>
  <div class="total">
    <p class="text-gray-900 font-thin" v-if="sum < freeDeliveryMin">
      Доставка: {{ deliveryPrice }} руб.
    </p>
    Сумма: {{ sum }} руб.
    <p class="text-gray-400 font-thin" v-if="sum >= freeDeliveryMin">
      <sup>*</sup>Стоимость доставки включена в общую стоимость заказа
    </p>
    <p class="text-gray-400 font-thin" v-else>
      <sup>*</sup>При заказе на сумму от {{ freeDeliveryMin }} руб. доставка за
      наш счет
    </p>
  </div>
</template>
