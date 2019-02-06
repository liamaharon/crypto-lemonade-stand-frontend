<template>
  <div>
    <h1 class="is-size-1">
      All Orders
    </h1>
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
import Order from '../components/Order';

export default {
  name: "Admin",
  components: {
    Order
  },
  computed: {
    ordersWithProduct: function() {
      return this.$store.getters.ordersWithProduct;
    },
    ordersUpdating: function() {
      return this.$store.state.orders.ordersUpdating;
    },
  },
  created: function() {
    this.$store.dispatch("fetchOrders");
    this.$store.dispatch("fetchProducts");
  },
  methods: {
    updateOrder: function(orderId) {
        const order = this.$store.state.orders.data.find(order => order.id === orderId);
        const newOrder = {...order};
        if (order.status === 'PENDING_PAYMENT') newOrder.status = 'PENDING_FULFILMENT';
        if (order.status === 'PENDING_FULFILMENT') newOrder.status = 'COMPLETED';
        this.$store.dispatch('updateOrder', {orderId, newOrder});
    }
  }
};
</script>

<style scoped>
.order {
  margin-bottom: 1rem;
}
</style>
