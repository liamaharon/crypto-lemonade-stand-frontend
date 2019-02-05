<template>
  <div class="home">
    <img class="img" alt="Vue logo" src="../assets/logo.png">
    <h1 class="is-size-1">Welcome to the Crypto Lemonade Stand!</h1>
    <div class="auth-btns">
      <router-link to="/login" class="button is-primary login">Login</router-link>
      <router-link to="/signup" class="button is-link">Sign up</router-link>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    // HelloWorld
  }
};
</script>

<style scoped>
.img {
  width: 20rem;
  height: auto;
}
.auth-btns {
  margin-top: 1rem;
}
.login {
  margin-right: 1rem;
}
</style>
