<template>
  <div class="wrapper">
    <div class="field">
      <label class="label">First name</label>
      <div class="control">
        <input v-model="firstName" class="input" type="text" placeholder="Lemon">
      </div>
    </div>
    <div class="field">
      <label class="label">Last name</label>
      <div class="control">
        <input v-model="lastName" class="input" type="text" placeholder="Ade">
      </div>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          v-bind:class="{'is-danger': !emailIsValid}"
          type="email"
          placeholder="juicy@fruits.com"
          v-model="email"
        >
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i v-bind:class="{'fa-exclamation-triangle': !emailIsValid}" class="fas"></i>
        </span>
      </div>
      <p v-if="!emailIsValid" class="help is-danger">Please enter a valid email address</p>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input v-model="password" class="input" type="password" placeholder="drinkup">
      </div>
    </div>

    <div class="field">
      <label class="label">Phone number</label>
      <div class="control has-icons-left has-icons-right">
        <input v-model="phoneNumber" class="input" type="tel" placeholder="04XXXXXXXX">
        <span class="icon is-small is-left">
          <i class="fas fa-phone"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas"></i>
        </span>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button v-bind:disabled="!formIsValid" class="button is-link">Signup</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "signup",
  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: ""
  }),
  computed: {
    emailIsValid: function() {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(this.email);
    },
    formIsValid: function() {
      return (
        this.firstName.length > 0 &&
        this.lastName.length > 0 &&
        this.password.length > 0 &&
        this.phoneNumber.length > 0 &&
        this.emailIsValid
      );
    }
  }
};
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
