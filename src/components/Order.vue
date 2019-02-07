<template>
  <div class="box wrapper">
    <span>Symbol: {{ ticker }}</span>
    <span>Amount: {{ qty }}</span>
    <span>Customer ID: {{ accountId }}</span>
    <span>Payout address: {{ payoutAddress }}</span>
    <span>Status: {{ status }}</span>
    <button
      v-if="updateBtnText"
      class="button is-primary"
      :class="{'is-loading': updating}"
      @click="updateOrder"
    >
      {{ updateBtnText }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Order",
  props: {
    ticker: String,
    status: String,
    qty: Number,
    payoutAddress: String,
    accountId: Number,
    updateOrder: Function,
    updating: Boolean
  },
  computed: {
    updateBtnText: function() {
      if (!this.updateOrder) return null;
      if (this.status === "PENDING_PAYMENT") return "Mark paid";
      if (this.status === "PENDING_FULFILMENT") return "Mark fulfilled";
      return null;
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
</style>
