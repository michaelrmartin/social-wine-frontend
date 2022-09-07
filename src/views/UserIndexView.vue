<script>
import axios from "axios";

export default {
  data: function () {
    return {
      users: [],
      nameSearch: "",
      currentUser: {},
      loggedInUser: {},
      userWines: [],
    };
  },
  created: function () {
    this.indexUsers();
    this.showUser();
  },
  watch: {
    currentUser: function () {
      console.log(this.currentUser);
    },
  },
  methods: {
    indexUsers: function () {
      axios.get("/users.json").then((response) => {
        this.users = response.data;
        console.log("All users: ", response.data);
      });
    },
    showUser: function () {
      axios.get("/users/" + localStorage.user_id + ".json").then((response) => {
        this.loggedInUser = response.data;
        this.userWines = this.loggedInUser.wines;
        console.log("One user: ", response.data);
        console.log("user wines: ", this.userWines);
      });
    },
    filterWines: function () {
      return this.userWines.filter((wine) => {
        var lowerName = wine.name.toLowerCase();
        var lowerNameSearch = this.nameSearch.toLowerCase();
        return lowerName.includes(lowerNameSearch);
      });
    },
    createRecommendation: function () {
      axios
        .post("/sendtext.json", {
          phone: this.currentUser.phone,
          textBody: "QORKED Epicure " + this.loggedInUser.name + " reccomends " + this.nameSearch + " .",
        })
        .then((response) => {
          console.log("Success!", response.data);
          this.nameSearch = "";
        });
    },
  },
};
</script>

<template>
  <div class="container">
    <div
      class="card mb-3"
      style="max-width: 100; max-height: 50; justify-content: center; border-width: 0.25rem; border-color: lightcoral"
      v-for="user in users"
      v-bind:key="user.id"
      v-on:mouseover="currentUser = user"
    >
      <div class="row g-0">
        <div class="col-md-4">
          <img
            v-bind:src="user.photo_url"
            class="img-fluid"
            style="border-right: solid; border-width: 0, 25rem; border-color: lightcoral"
            alt="..."
          />
        </div>
        <div class="col-md-8">
          <div class="card-body" style="padding: 50px">
            <h3 class="card-title">{{ user.name }}</h3>
            <p class="card-text">
              <small class="text-muted">{{ user.location }}</small>
            </p>
            <h5 class="card-text">
              {{ user.bio }}
            </h5>
            <div>
              <a class="btn btn-primary" v-bind:href="'/users/' + currentUser.id" role="button">Visit My Profile</a>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style="margin: 25px"
              >
                Recommend a Wine!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Make a Recommendation</h5>
          </div>
          <div class="modal-body">
            <div class="row p-3">
              <form v-on:submit.prevent="createRecommendation()">
                <label for="exampleDataList" class="form-label">Search</label>
                <input class="form-control" v-model="nameSearch" list="names" placeholder="Type to search..." />
                <datalist id="names">
                  <option v-for="wine in filterWines()" v-bind:key="wine.id">{{ wine.name }}</option>
                </datalist>
                <div>
                  <button type="submit" class="btn btn-primary">Recommend!</button>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
