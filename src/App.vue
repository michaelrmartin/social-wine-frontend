<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">QORKD</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a v-if="!isLoggedIn" class="nav-link active" aria-current="page" href="/">Home</a>
            <a v-if="isLoggedIn" class="nav-link active" aria-current="page" href="/wines">Home</a>
          </li>
          <li class="nav-item">
            <a v-if="!isLoggedIn" class="nav-link active" href="/signup">Signup</a>
            <a v-if="isLoggedIn" class="nav-link active" href="/users">Epicures</a>
          </li>
          <li class="nav-item">
            <a v-if="!isLoggedIn" class="nav-link active" href="/login">Login</a>
          </li>
          <li v-if="isLoggedIn" class="nav-item dropdown">
            <a
              class="nav-link active dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Profile
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" v-bind:href="'/users/' + user_id">My Profile</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="/logout">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      isLoggedIn: !!localStorage.jwt,
      user_id: localStorage.user_id,
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
};
</script>

<style>
#app {
  font-family: "Raleway", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3f3939;
}

nav {
  padding: 30px;
  background-image: url("https://images.unsplash.com/photo-1611948983382-631eaeec6069?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2839&q=80");
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
.container {
  padding: 30px;
}

body {
  font-weight: strong;
  font-family: "Raleway", Helvetica, Arial, sans-serif;
  background-image: url("https://images.unsplash.com/photo-1615799998603-7c6270a45196?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2804&q=80");
  background-size: cover;
}
</style>
