<template>
  <div class="wrapper">
    <router-link
      to="/"
      class="home-btn"
    >
      Home
    </router-link>
    <div
      v-if="!!loggedInUser"
      class="left-margin"
    >
      <span class="loggedinas">
        Logged in: {{ loggedInUser.email }}
      </span>
      <button
        class="button"
        @click="onClickLogout()"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    loggedInUser: function() {
      return this.$store.state.auth.loggedInUser;
    }
  },
  methods: {
    onClickLogout: function() {
      this.$store.dispatch("logout");
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
