<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      wines: [],
    };
  },
  created: function () {
    this.showUser();
  },
  methods: {
    showUser: function () {
      axios.get("/users/" + this.$route.params.id + ".json").then((response) => {
        this.user = response.data;
        this.wines = this.user.wines;
        console.log("One user: ", response.data);
      });
    },
  },
};
</script>

<template>
  <div>
    <h2>{{ user.name }} Profile</h2>
    <div class="index">
      <h1>Wines</h1>
      <div v-for="wine in user.wines" v-bind:key="wine">
        <h2>{{ wine.name }}</h2>
        <p>{{ wine.producer }}</p>
        <p>{{ wine.vintage }}</p>
        <p>{{ wine.blend }}</p>
        <p>{{ wine.price }}</p>
      </div>
    </div>
  </div>
</template>
