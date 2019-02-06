<template>
  <div class="box wrapper">
    <span>
      Symbol: {{ ticker }}
    </span> 
    <span>
      Amount: {{ qty }}
    </span>
    <span>
      Customer ID: {{ accountId }}
    </span>
    <span>
      Payout address: {{ payoutAddress }}
    </span>
    <span>
      Status: {{ status }}
    </span>
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
    accountId: Number
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
</style>
