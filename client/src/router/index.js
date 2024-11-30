import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Authentication/Login.vue";
import Register from "../pages/Authentication/Register.vue";
import Home from "../pages/Home.vue";
import BookList from "../pages/Book/BookList.vue";
import BookDetails from "../pages/Book/BookDetails.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
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
  {
    path: "/books",
    name: "Books",
    component: BookList,
  },
  {
    path: "/books/:id",
    name: "BookDetails",
    component: BookDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
