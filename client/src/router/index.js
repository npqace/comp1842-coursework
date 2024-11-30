import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Authentication/Login.vue";
import Register from "../pages/Authentication/Register.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
