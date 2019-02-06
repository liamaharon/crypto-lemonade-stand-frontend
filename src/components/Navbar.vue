<template>
  <div class="wrapper">
    <router-link to="/" class="home-btn">Home</router-link>
    <div class="left-margin" v-if="!!loggedInUser">
      <span class="loggedinas">Logged in: {{loggedInUser.email}}</span>
      <button v-on:click="onClickLogout()" class="button">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    onClickLogout: function() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    loggedInUser: function() {
      return this.$store.state.auth.loggedInUser;
    }
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
