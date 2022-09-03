<script>
import axios from "axios";

export default {
  data: function () {
    return {
      wines: [],
      currentWine: {},
      addToUserWine: false,
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
    createUserWine: function () {
      axios.post("/user_wines.json", { wine_id: this.currentWine.id }).then((response) => {
        console.log("Succes:", response.data);
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
              <a
                data-toggle="modal"
                data-target="#exampleModal"
                class="card-link"
                v-on:click="(currentWine = wine), (addToUserWine = false)"
              >
                More Info
              </a>
              <a
                data-toggle="modal"
                data-target="#exampleModal"
                class="card-link"
                v-on:click="(currentWine = wine), (addToUserWine = true)"
              >
                Add to My Wines
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
              <h5 class="modal-title" id="exampleModalLabel">{{ currentWine.name }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h6>Grapes: {{ currentWine.blend }}</h6>
              <p>Country: {{ currentWine.origin }}</p>
              <p>Profile: {{ currentWine.style }}</p>
              <p>Description: {{ currentWine.description }}</p>
              <p>Price: {{ currentWine.price }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" v-if="addToUserWine" v-on:click="createUserWine()">
                Add to My Wines
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
