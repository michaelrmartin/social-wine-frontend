import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import UserWineIndexView from "../views/UserWineIndexView.vue";
import UserShowView from "../views/UserShowView.vue";
import UserIndexView from "../views/UserIndexView.vue";
import WineIndexView from "../views/WineIndexView.vue";
import WineNewView from "../views/WineNewView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
  },
  {
    path: "/wines",
    name: "wines-index",
    component: WineIndexView,
  },
  {
    path: "/wines/new",
    name: "wines-create",
    component: WineNewView,
  },
  {
    path: "/user_wines",
    name: "user_wine-index",
    component: UserWineIndexView,
  },
  {
    path: "/users",
    name: "user-index",
    component: UserIndexView,
  },
  {
    path: "/users/:id",
    name: "user-show",
    component: UserShowView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
