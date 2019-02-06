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
          v-bind:class="{'is-danger': showEmailError}"
          v-on:blur="onEmailBlur()"
          type="email"
          placeholder="juicy@fruits.com"
          v-model="email"
        >
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i v-bind:class="{'fa-exclamation-triangle': showEmailError}" class="fas"></i>
        </span>
      </div>
      <p v-if="showEmailError" class="help is-danger">Please enter a valid email address</p>
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
        <button
          v-on:click="onClickSignup()"
          v-bind:disabled="!formIsValid"
          class="button is-link"
          v-bind:class="{'is-loading': signingUp}"
        >Signup</button>
      </div>
    </div>
    <article v-if="signupError" class="message is-danger">
      <div
        class="message-body"
      >There was a problem registering your account. Please try again later.
        <br>
        <span class="signup-error-msg">{{signupError}}</span>
      </div>
    </article>
  </div>
</template>

<script>
import { validEmailRegex } from "../utils/regex.js";
export default {
  name: "signup",
  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    emailTouched: false
  }),
  methods: {
    onEmailBlur() {
      this.emailTouched = true;
    },
    onClickSignup() {
      this.$store.dispatch("signUp", {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber
      });
    }
  },
  computed: {
    emailIsValid: function() {
      return validEmailRegex.test(this.email);
    },
    showEmailError: function() {
      return !this.emailIsValid && this.emailTouched;
    },
    formIsValid: function() {
      return (
        this.firstName.length > 0 &&
        this.lastName.length > 0 &&
        this.password.length > 0 &&
        this.phoneNumber.length > 0 &&
        this.emailIsValid
      );
    },
    signupError: function() {
      return this.$store.state.signup.signupError;
    },
    signingUp: function() {
      return this.$store.state.signup.signingUp;
    }
  }
};
</script>

<style scoped>
.wrapper {
  margin-top: 5rem;
  max-width: 30rem;
}
.field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.control {
  width: 100%;
}
.message-body {
  text-align: left;
}
.signup-error-msg {
  font-size: 12px;
}
</style>
