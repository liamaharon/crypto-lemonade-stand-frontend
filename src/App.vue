<template>
  <div id="app">
    <navbar />
    <div class="app-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  created() {
    this.$store.dispatch('recoverUserState');
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app-wrapper {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 70vw;
}
</style>
