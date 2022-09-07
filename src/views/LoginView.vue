<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push(`/users/${response.data.user_id}`);
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>

<template>
  <div class="container" style="width: 40%">
    <div class="login">
      <form v-on:submit.prevent="submit()">
        <h1>Login</h1>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div class="mb-3">
          <label for="loginEmailInput" class="form-label">Email</label>
          <input type="email" class="form-control" v-model="newSessionParams.email" />
        </div>
        <div class="mb-3">
          <label for="loginPasswordInput" class="form-label">Password</label>
          <input type="password" class="form-control" v-model="newSessionParams.password" />
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  </div>
</template>
