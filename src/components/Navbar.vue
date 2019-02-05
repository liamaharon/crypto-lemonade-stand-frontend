<template>
  <div class="wrapper">
    <router-link to="/" class="home-btn">Home</router-link>
    <button v-if="loggedIn" class="button">Logout</button>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    loggedIn: Boolean
  }
};
</script>

<style scoped>
  .wrapper {
    margin: 1rem;
    display: flex;
  }
  .button {
    margin-left: auto;
  }
</style>
