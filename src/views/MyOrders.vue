<template>
  <div>
    <div class="wrapper">
      <div class="header-wrapper">
        <h1 class="is-size-1">
          My orders
        </h1>
        <button
          class="button is-primary new-order-btn"
          @click="showModal"
        >
          New order
        </button>
      </div>
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
    <div
      class="modal"
      :class="{'is-active': modalActive}"
    >
      <div class="modal-background" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            New order 
          </p>
          <button
            class="delete"
            aria-label="close"
            @click="hideModal"
          />
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">
              Product
            </label>
            <div class="select">
              <select
                v-model="modalForm.productId"
              >
                <option
                  v-for="product in products.data"
                  :key="product.id"
                  :value="product.id"
                >
                  {{ product.name }} ({{ product.ticker }}) 
                </option>
              </select>
            </div>
          </div>
          <div class="field">
            <label class="label">
              Qty
            </label>
            <div class="control">
              <input
                v-model="modalForm.qty"
                class="input"
                type="number"
                placeholder="1.1234"
              >
            </div>
          </div>
          <div class="field">
            <label class="label">
              Payout address
            </label>
            <div class="control">
              <input
                v-model="modalForm.payoutAddress"
                class="input"
                type="text"
                placeholder="0xd46d765497bce77897293104bd8418fc04521c12"
              >
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">
            Create order
          </button>
          <button
            class="button"
            @click="hideModal"
          >
            Cancel
          </button>
        </footer>
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
  data: function() {
    return {
      modalActive: false,
      modalForm: {
        productId: 1,
        qty: 0,
        payoutAddress: ""
      }
    };
  },
  computed: {
    ordersWithProduct: function() {
      return this.$store.getters.ordersWithProduct;
    },
    ordersError: function() {
      return this.$store.state.orders.error;
    },
    products: function() {
      return this.$store.state.products;
    },
  },
  created: function() {
    this.$store.dispatch("fetchOrders", this.$store.state.auth.loggedInUser.id);
    this.$store.dispatch("fetchProducts");
  },
  methods: {
    showModal: function() {
      this.modalActive = true;
    },
    hideModal: function() {
      // close modal and reset form
      this.modalActive = false;
      this.modalForm = {
        productId: 1,
        qty: 0,
        payoutAddress: ""
      };
    },
    newOrder: function() {
      const order = {
        ...this.modalForm, status: 'PENDING_PAYMENT' 
      };
      this.$store.dispatch('newOrder', order);
    },
  },
};
</script>

<style scoped>
.order {
  margin-bottom: 1rem;
}
.header-wrapper {
  display: flex;
  align-items: center;
}
.new-order-btn {
  margin-left: 1rem;
}
.label {
  text-align: left;
}
.modal-card {
  width: 30rem;
}
select, .select {
  width: 100%;
}
</style>
