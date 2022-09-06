<script>
import axios from "axios";

export default {
  data: function () {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      bio: "",
      location: "",
      imageFile: "",
      phone: "",
      errors: [],
    };
  },
  methods: {
    setFile: function (event) {
      if (event.target.files.length > 0) {
        this.imageFile = event.target.files[0];
      }
    },
    submit: function () {
      var formData = new FormData();
      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("password_confirmation", this.password_confirmation);
      formData.append("bio", this.bio);
      formData.append("location", this.location);
      formData.append("phone", this.phone);
      formData.append("image_file", this.imageFile);

      axios
        .post("/users", formData)
        .then((response) => {
          console.log(response.data);
          this.name = "";
          this.email = "";
          this.password = "";
          this.password_confirmation = "";
          this.bio = "";
          this.location = "";
          this.imageFile = "";
          this.phone = "";
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="container">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Name:</label>
        <input type="text" v-model="name" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" />
      </div>
      <div>
        <label>Password confirmation:</label>
        <input type="password" v-model="password_confirmation" />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" v-model="location" />
      </div>
      <div>
        <label>Phone number:</label>
        <input type="text" v-model="phone" />
      </div>
      <div>
        <label>Bio:</label>
        <input type="text" v-model="bio" />
      </div>
      <div>
        Image:
        <input type="file" v-on:change="setFile($event)" ref="fileInput" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>
