<script setup lang="ts">
const { sum } = defineProps<{
  sum: number;
  deliveryPrice: number;
  freeDeliveryMin: number;
}>();
</script>
<template>
  <div class="total lg:flex gap-4 items-start">
    <div class="min-w-[240px]">
      <p class="text-gray-900 font-thin">
        Сумма:
        <span v-if="sum < freeDeliveryMin">{{ sum - deliveryPrice }} руб.</span>
        <span v-else>{{ sum }}</span>
      </p>
      <p class="text-gray-900 font-thin">
        Доставка:
        <span v-if="sum < freeDeliveryMin">{{ deliveryPrice }} руб.</span>
        <span v-else>Бесплатно</span>
      </p>
      К оплате: {{ sum }} руб.
    </div>
    <div>
      <Badge v-if="sum >= freeDeliveryMin" :badgeType="'success'">
        <p class="text-gray-400 font-thin">
          Стоимость доставки включена в общую стоимость заказа
        </p>
      </Badge>
      <Badge v-else :badgeType="'promo'">
        <p class="text-gray-400 font-thin">
          При заказе на сумму от {{ freeDeliveryMin }} руб. доставка за наш счет
        </p>
      </Badge>
    </div>
  </div>
</template>
