<template>
  <div class="wrapper">
    <h1 class="is-size-1">
      My orders
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
      <h1
        v-if="ordersWithProduct.length === 0"
        class="is-size-3"
      >
        You have no orders
      </h1>
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
import Order from '@/components/Order';

export default {
  name: "MyOrders",
  components: {
    Order
  },
  computed: {
    ordersWithProduct: function() {
      return this.$store.getters.ordersWithProduct;
    },
    ordersError: function() {
      return this.$store.state.orders.error;
    },
  },
  created: function() {
    this.$store.dispatch("fetchOrders", this.$store.state.auth.loggedInUser.id);
    this.$store.dispatch("fetchProducts");
  },
  // methods: {
  //   updateOrder: function(orderId) {
  //       const order = this.$store.state.orders.data.find(order => order.id === orderId);
  //       const newOrder = {...order};
  //       if (order.status === 'PENDING_PAYMENT') newOrder.status = 'PENDING_FULFILMENT';
  //       if (order.status === 'PENDING_FULFILMENT') newOrder.status = 'COMPLETED';
  //       this.$store.dispatch('updateOrder', {orderId, newOrder});
  //   },
  //   updateProduct: function(productId, newProduct) {
  //       this.$store.dispatch('updateProduct', {productId, newProduct});
  //   }
  // }
};
</script>

<style scoped>
.order {
  margin-bottom: 1rem;
}
</style>
