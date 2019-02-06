<template>
  <div>
    <h1 class="is-size-1">
      Admin
    </h1>
  </div>
</template>

<script>
export default {
  name: "Admin",
  created: function() {
    this.$store.dispatch("fetchOrders");
    this.$store.dispatch("fetchProducts");
  }
};
</script>

<style scoped>
</style>
