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
  <div v-for="user in users" v-bind:key="user.id">
    <h2>{{ user.name }}</h2>
  </div>
</template>
