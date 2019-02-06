<template>
  <div>
    <h1 class="is-size-1">Admin</h1>
  </div>
</template>

<script>
export default {
  name: "admin",
  created: function() {
    this.$store.dispatch("fetchOrders");
  }
};
</script>

<style scoped>
</style>
