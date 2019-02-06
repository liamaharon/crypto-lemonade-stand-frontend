<template>
  <div class="box">
    Order
  </div>
</template>

<script>
export default {
  name: "Order",
  props: {
    ticker: String,
    name: String,
    status: String,
    qty: String,
    customerEmail: String,
    timeCreated: Number
  }
};
</script>

<style scoped>
.wrapper {
  margin: 1rem;
  display: flex;
}
.left-margin {
  display: flex;
  align-items: baseline;
  margin-left: auto;
}
.loggedinas {
  margin-right: 1rem;
}
</style>
