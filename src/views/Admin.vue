<template>
  <div class="wrapper">
    <orders-admin
      class="orders-admin"
      :orders-with-product="ordersWithProduct"
      :update-order="updateOrder"
      :orders-error="ordersError"
      :orders-updating="ordersUpdating"
    />
    <products-admin
      :products="products"
      :update-product="updateProduct"
      :products-updating="products.productsUpdating"
    />
  </div>
</template>

<script>
import OrdersAdmin from '@/components/OrdersAdmin';
import ProductsAdmin from '@/components/ProductsAdmin';

export default {
  name: "Admin",
  components: {
    OrdersAdmin,
    ProductsAdmin
  },
  computed: {
    ordersWithProduct: function() {
      return this.$store.getters.ordersWithProduct;
    },
    ordersUpdating: function() {
      return this.$store.state.orders.ordersUpdating;
    },
    ordersError: function() {
      return this.$store.state.orders.error;
    },
    products: function() {
      return this.$store.state.products;
    }
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
    },
    updateProduct: function(productId, newProduct) {
        this.$store.dispatch('updateProduct', {productId, newProduct});
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.orders-admin {
  margin-right: 4rem;
}
</style>
