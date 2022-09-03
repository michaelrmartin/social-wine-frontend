<script>
import axios from "axios";

export default {
  data: function () {
    return {
      wines: [],
    };
  },
  created: function () {
    this.indexWines();
  },
  methods: {
    indexWines: function () {
      axios.get("/wines.json").then((response) => {
        this.wines = response.data;
        console.log("All wines:", response.data);
      });
    },
  },
};
</script>

<template>
  <div>
    <div class="index">
      <h1>All Wines</h1>
      <div class="row">
        <div class="col-sm-4" v-for="wine in wines" v-bind:key="wine.id">
          <div class="card mb-4" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">{{ wine.name }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ wine.blend }}</h6>
              <p class="card-text">{{ wine.style }}</p>
              <a href="#" class="card-link">Card link</a>
              <a href="#" class="card-link">Another link</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
