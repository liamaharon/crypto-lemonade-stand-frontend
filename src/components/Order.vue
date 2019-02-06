<template>
  <div class="box wrapper">
    <span>
      Symbol: {{ ticker }}
    </span> 
    <span>
      Amount: {{ qty }}
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
    qty: String,
    payoutAddress: String,
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
