<template>
  <div class="wrapper">
    <router-link
      to="/"
      class="home-btn"
    >
      Home
    </router-link>
    <div
      v-if="!!loggedInUser.authToken"
      class="left-margin"
    >
      <span class="email">
        Logged in: {{ loggedInUser.email }}
      </span>
      <button
        class="button is-primary"
        @click="loggedInUser.isAdmin ? onClickAdmin() : onClickMyOrders()"
      >
        {{ loggedInUser.isAdmin ? "Admin": "My orders" }}
      </button>
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
    },
    onClickAdmin: function() {
      this.$router.push("/admin");
    },
    onClickMyOrders: function() {
      this.$router.push("/myorders");
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
.email,
.is-primary {
  margin-right: 1rem;
}
</style>
