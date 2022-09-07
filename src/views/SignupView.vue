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
  <div class="container" style="width: 50%">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div class="mb-3">
        <label for="signupNameInput" class="form-label">Name</label>
        <input type="text" class="form-control" id="signupNameInput" v-model="name" />
      </div>
      <div class="mb-3">
        <label for="signupEmailInput" class="form-label">Email</label>
        <input type="email" class="form-control" id="signupEmailInput" v-model="email" />
      </div>
      <div class="mb-3">
        <label for="signupPasswordInput" class="form-label">Password</label>
        <input type="password" class="form-control" id="signupPasswordInput" v-model="password" />
      </div>
      <div class="mb-3">
        <label for="signupPasswordConfirmInput" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="signupPasswordConfirmInput" v-model="password_confirmation" />
      </div>
      <div class="mb-3">
        <label for="signupLocationInput" class="form-label">Location</label>
        <input type="text" class="form-control" id="signupLocationInput" v-model="location" />
      </div>
      <div class="mb-3">
        <label for="signupPhoneInput" class="form-label">Phone number</label>
        <input type="text" class="form-control" id="signupPhoneInput" v-model="phone" />
      </div>
      <div class="mb-3">
        <label for="signupBioInput" class="form-label">Bio</label>
        <textarea class="form-control" id="signupBioInput" v-model="bio"></textarea>
      </div>
      <div class="mb-3">
        <label for="signupImageInput" class="form-label">Image</label>
        <input type="file" class="form-control" id="signupImageInput" v-on:change="setFile($event)" ref="fileInput" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>
