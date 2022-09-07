<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      wines: [],
      favoriteWines: [],
      currentWine: {},
      editMyWine: false,
    };
  },
  created: function () {
    this.showUser();
  },
  watch: {
    currentWine: function () {
      console.log(this.currentWine);
    },
  },
  methods: {
    showUser: function () {
      axios.get("/users/" + this.$route.params.id + ".json").then((response) => {
        this.user = response.data;
        this.wines = this.user.wines;
        console.log("One user: ", response.data);
        console.log("wines: ", this.user.wines);
        console.log("userwines: ", this.user.user_wines);
        console.log("favorites: ", this.favoriteWines);
      });
    },
    createUserFavorite: function () {
      axios.patch("/user_wines/" + this.currentWine.id + ".json", { favorite: true }).then((response) => {
        console.log("Success:", response.data);
      });
    },
    destroyUserWine: function () {
      axios.delete("/user_wines/" + this.currentWine.id + ".json").then((response) => {
        console.log(response.data);
      });
    },
  },
};
</script>

<template>
  <div>
    <div class="container">
      <div
        class="card mb-3"
        style="max-width: 100; justify-content: center; border-width: 0.25rem; border-color: lightcoral"
      >
        <div class="row g-0">
          <div class="col-md-4">
            <img v-bind:src="user.photo_url" class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body" style="padding: 75px">
              <h3 class="card-title">{{ user.name }}</h3>
              <p class="card-text">
                <small class="text-muted">{{ user.location }}</small>
              </p>
              <h5 class="card-text">
                {{ user.bio }}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <h2>{{ user.name }}'s Wines</h2>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" v-for="wine in wines" v-bind:key="wine.id">
          <div class="card h-100" style="width: 18rem; border-width: 0.25rem; border-color: lightcoral">
            <img v-bind:src="wine.photo" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{{ wine.name }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ wine.blend }}</h6>
              <p class="card-text">{{ wine.style }}</p>
              <a
                data-toggle="modal"
                data-target="#exampleModal"
                class="card-link"
                v-on:click="(currentWine = wine), (editMyWine = false)"
              >
                More Info
              </a>
              <a
                data-toggle="modal"
                data-target="#exampleModal"
                class="card-link"
                v-on:click="(currentWine = wine), (editMyWine = true)"
              >
                Edit Info
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalLabel"></h4>
            </div>
            <div class="modal-body">
              <h5>{{ currentWine.name }}</h5>
              <h6>Grapes: {{ currentWine.blend }}</h6>
              <p>Country: {{ currentWine.country }}</p>
              <p>Profile: {{ currentWine.style }}</p>
              <p>Description: {{ currentWine.description }}</p>
              <p>Price: ${{ currentWine.price }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" v-if="editMyWine" v-on:click="createUserFavorite()">
                Add to My Favorites
              </button>
              <button type="button" class="btn btn-primary" v-if="editMyWine" v-on:click="destroyUserWine()">
                Delete
              </button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card-img-top {
  width: 100%;
  height: 15vw;
  object-fit: contain;
}
</style>
