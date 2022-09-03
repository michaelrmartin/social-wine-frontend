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
    <h1>{{ user.name }}'s Profile</h1>
    <div class="index">
      <h2>{{ user.name }}'s Wines</h2>
      <div class="row">
        <div class="col-sm-4" v-for="wine in user.wines" v-bind:key="wine.id">
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
