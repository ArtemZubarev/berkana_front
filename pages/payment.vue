<script lang="ts" setup>
import type { StrapiResponse } from "~/composables/useStrapi";

const route = useRoute();
const { postStrapi } = useStrapi();

const orderId = route.query.order;

onMounted(async () => {
  if (orderId) {
    try {
      const postResponse: any = await postStrapi<StrapiResponse>(
        "/api/orders/order-status",
        {
          orderId,
        }
      );
      console.log(postResponse);
    } catch (e) {
      throw e;
    }
  }
});
</script>

<template>
  <div>Статус:</div>
</template>
