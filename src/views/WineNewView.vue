<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newWineParams: {},
      errors: [],
      myOptions: [
        { text: "France", value: 1 },
        { text: "Portugal", value: 2 },
        { text: "United States", value: 3 },
        { text: "Italy", value: 4 },
        { text: "New Zealand", value: 5 },
        { text: "Hungary", value: 6 },
        { text: "Germany", value: 7 },
        { text: "Australia", value: 8 },
        { text: "South Africa", value: 9 },
        { text: "Argentina", value: 10 },
        { text: "Please select an option", value: null },
      ],
    };
  },
  methods: {
    createWine: function () {
      axios
        .post("/wines.json", this.newWineParams)
        .then((response) => {
          console.log("Success!", response.data);
          this.$routerpush("/wines");
        })
        .catch((error) => {
          console.log(error.response.data.erorrs);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div>
    <h1>Add a New Wine</h1>
    <form v-on:submit.prevent="createWine()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div>
        Name:
        <input class="form" type="text" v-model="newWineParams.name" />
      </div>
      <div>
        Blend:
        <input class="form" type="text" v-model="newWineParams.name" />
      </div>
      <div>
        Style:
        <input class="form" type="text" v-model="newWineParams.name" />
      </div>
      <div>
        Description:
        <input class="form" type="text" v-model="newWineParams.name" />
      </div>
      <div>
        Price:
        <input class="form" type="number" v-model="newWineParams.name" />
      </div>
    </form>
  </div>
</template>
