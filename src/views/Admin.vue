<template>
  <div>
    <h1 class="is-size-1">
      All orders
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
    }
  },
  created: function() {
    this.$store.dispatch("fetchOrders");
    this.$store.dispatch("fetchProducts");
  }
};
</script>

<style scoped>
.order {
  margin-bottom: 1rem;
}
</style>
