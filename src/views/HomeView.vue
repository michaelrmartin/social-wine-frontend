<script>
import axios from "axios";

export default {
  data: function () {
    return {
      wines: [],
      currentWine: {},
      nameSearch: "",
      message: "",
    };
  },
  created: function () {
    this.indexWines();
  },
  watch: {
    currentWine: function () {
      console.log(this.currentWine);
    },
  },
  methods: {
    indexWines: function () {
      axios.get("/wines.json").then((response) => {
        this.wines = response.data;
        console.log("All wines:", response.data);
      });
    },
    filterWines: function () {
      return this.wines.filter((wine) => {
        var lowerName = wine.name.toLowerCase();
        var lowerNameSearch = this.nameSearch.toLowerCase();
        return lowerName.includes(lowerNameSearch);
      });
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <img
        src="https://res.cloudinary.com/do4nbvqf0/image/upload/v1662576124/QORKD_ibtdyt.jpg"
        style="border-radius: 25px; max-width: 100%; max-height: 50%"
      />
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="row p-3">
        Search:
        <input type="text" v-model="nameSearch" list="names" />
        <datalist id="names">
          <option v-for="wine in filterWines()" v-bind:key="wine.id">{{ wine.name }}</option>
        </datalist>
      </div>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <TransitionGroup name="list">
          <div class="col" v-for="wine in filterWines()" v-bind:key="wine.id" v-on:mouseover="currentWine = wine">
            <div
              class="card h-100"
              style="width: 18rem; border-width: 0.25rem; border-color: lightcoral"
              v-bind:class="{ selected: wine === currentWine }"
            >
              <img v-bind:src="wine.photo" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{{ wine.name }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ wine.blend }}</h6>
                <p class="card-text">{{ wine.country }}</p>
                <p class="card-text">{{ wine.style }}</p>
                <a data-toggle="modal" data-target="#exampleModal" class="card-link" v-on:click="currentWine = wine">
                  More Info
                </a>
              </div>
            </div>
          </div>
        </TransitionGroup>
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
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.selected {
  /* color: white; */
  background-color: #f0abab;
  transition: background-color 1s ease;
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}

.card-img-top {
  width: 100%;
  height: 15vw;
  object-fit: contain;
}
</style>
