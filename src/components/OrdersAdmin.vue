<template>
  <div>
    <h1 class="is-size-1">
      All orders
    </h1>
    <article
      v-if="ordersError"
      class="message is-danger"
    >
      <div class="message-body">
        <span>
          {{ ordersError }}
        </span>
      </div>
    </article>
    <div>
      <div
        v-for="order in ordersWithProduct"
        :key="order.id"
      >
        <order 
          class="order"
          :ticker="order.product.ticker || 'Loading...'"
          :qty="order.qty"
          :account-id="order.accountId"
          :status="order.status"
          :payout-address="order.address"
          :update-order="() => updateOrder(order.id)"
          :updating="ordersUpdating[order.id] || false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Order from '@/components/Order';

export default {
  name: "OrdersAdmin",
  components: {
    Order
  },
  props: {
    ordersWithProduct: Array,
    ordersError: String,
    ordersUpdating: Object,
    updateOrder: Function
  }
};
</script>

<style scoped>
.order {
  margin-bottom: 1rem;
}
</style>
