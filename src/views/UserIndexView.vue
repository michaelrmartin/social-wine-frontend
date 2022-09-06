<script>
import axios from "axios";

export default {
  data: function () {
    return {
      users: [],
    };
  },
  created: function () {
    this.indexUsers();
  },
  methods: {
    indexUsers: function () {
      axios.get("/users.json").then((response) => {
        this.users = response.data;
        console.log("All users: ", response.data);
      });
    },
  },
};
</script>

<template>
  <div class="container">
    <div
      class="card mb-3"
      style="max-width: 100; max-height: 50; justify-content: center"
      v-for="user in users"
      v-bind:key="user.id"
    >
      <div class="row g-0">
        <div class="col-md-4">
          <img v-bind:src="user.photo_url" class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ user.name }}</h5>
            <p class="card-text">
              {{ user.bio }}
            </p>
            <p class="card-text">
              <small class="text-muted">{{ user.location }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
