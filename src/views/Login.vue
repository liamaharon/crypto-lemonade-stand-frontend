<template>
  <div class="wrapper">
    <div class="field">
      <label class="label">
        Email
      </label>
      <div class="control has-icons-left has-icons-right">
        <input
          v-model="email"
          class="input"
          :class="{'is-danger': showEmailError}"
          type="email"
          placeholder="juicy@fruits.com"
          @blur="onEmailBlur()"
        >
        <span class="icon is-small is-left">
          <i class="fas fa-envelope" />
        </span>
        <span class="icon is-small is-right">
          <i
            :class="{'fa-exclamation-triangle': showEmailError}"
            class="fas"
          />
        </span>
      </div>
      <p
        v-if="showEmailError"
        class="help is-danger"
      >
        Please enter a valid email address
      </p>
    </div>

    <div class="field">
      <label class="label">
        Password
      </label>
      <div class="control">
        <input
          v-model="password"
          class="input"
          type="password"
          placeholder="drinkup"
        >
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button
          :disabled="!formIsValid"
          class="button is-link"
          :class="{'is-loading': loggingIn}"
          @click="onClickLogin()"
        >
          Login
        </button>
      </div>
    </div>
    <article
      v-if="loginError"
      class="message is-danger"
    >
      <div class="message-body">
        There was a problem logging in.
        <br>
        <span class="login-error-msg">
          {{ loginError }}
        </span>
      </div>
    </article>
    <article
      v-if="!!signupEmail"
      class="message is-success"
    >
      <div class="message-body">
        Account {{ signupEmail }} created successfully! Please login.
      </div>
    </article>
  </div>
</template>

<script>
import { validEmailRegex } from "../utils/regex";
export default {
  name: "Login",
  data: () => ({
    email: "admin@email.com",
    password: "admin",
    emailTouched: false
  }),
  computed: {
    signupEmail: function() {
      return this.$route.query.signupEmail;
    },
    emailIsValid: function() {
      return validEmailRegex.test(this.email);
    },
    showEmailError: function() {
      return !this.emailIsValid && this.emailTouched;
    },
    formIsValid: function() {
      return this.password.length > 0 && this.emailIsValid;
    },
    loginError: function() {
      return this.$store.state.auth.loginError;
    },
    loggingIn: function() {
      return this.$store.state.auth.loggingIn;
    }
  },
  methods: {
    onEmailBlur() {
      this.emailTouched = true;
    },
    onClickLogin() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
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
.login-error-msg {
  font-size: 12px;
}
</style>
