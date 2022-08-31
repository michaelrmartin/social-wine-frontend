<script>
import axios from "axios";

export default {
  data: function () {
    return {
      userWines: [],
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
    <div v-for="userWine in userWines" v-bind:key="userWine.id">
      <h2>{{ userWine.wine.name }}</h2>
      <p>{{ userWine.wine.producer }}</p>
      <p>{{ userWine.wine.vintage }}</p>
      <p>{{ userWine.wine.blend }}</p>
      <p>{{ userWine.wine.price }}</p>
    </div>
  </div>
</template>

<style></style>
