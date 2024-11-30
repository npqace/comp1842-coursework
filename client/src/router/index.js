import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Authentication/Login.vue";
import Register from "../pages/Authentication/Register.vue";
import Home from "../pages/Home.vue";
import BookList from "../pages/Book/BookList.vue";
import BookDetails from "../pages/Book/BookDetailsPage.vue";
import GenreList from "../pages/Genre/GenreList.vue";
import store from "../store/auth";

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
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresGuest: true },
  },
  {
    path: "/books",
    name: "Books",
    component: BookList,
    meta: { requiresAuth: true },
  },
  {
    path: "/books/:id",
    name: "BookDetails",
    component: BookDetails,
    meta: { requiresAuth: true },
  },
  {
    path: "/genres",
    name: "Genres",
    component: GenreList,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!store.state.token;

  // Route requires auth
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
    return;
  }

  // Route requires guest
  if (to.meta.requiresGuest && isAuthenticated) {
    next("/");
    return;
  }

  next();
});

export default router;
