<script>
import axios from "axios";

export default {
  data: function () {
    return {
      userWines: [],
      wines: [],
    };
  },
  created: function () {
    this.indexUserWines();
  },
  methods: {
    indexUserWines: function () {
      axios.get("/user_wines.json").then((response) => {
        this.userWines = response.data;
        console.log("All wines:", response.data);
      });
    },
  },
};
</script>

<template>
  <div class="index">
    <h1>Wines</h1>
    <div v-for="wine in wines" v-bind:key="wine.id">
      <h2>{{ wine.name }}</h2>
      <p>{{ wine.producer }}</p>
      <p>{{ wine.vintage }}</p>
      <p>{{ wine.blend }}</p>
      <p>{{ wine.price }}</p>
    </div>
  </div>
</template>

<style></style>
