<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

// Reactive state for dropdown
const isDropdownOpen = ref(false);

// Computed properties
const isLoggedIn = computed(() => !!store.state.token);
const userEmail = computed(() => store.state.user?.email || "User");

// Logout method
const logout = () => {
  store.commit("clearAuth");
  router.push("/login");
  isDropdownOpen.value = false;
};

// Conditional rendering computeds
const shouldShowLogin = computed(() => {
  return (
    !isLoggedIn.value && route.path !== "/login" && route.path !== "/register"
  );
});

const shouldShowRegister = computed(() => {
  return (
    !isLoggedIn.value && route.path !== "/login" && route.path !== "/register"
  );
});

// Toggle dropdown
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Close dropdown when clicking outside
const closeDropdown = (event) => {
  if (!event.target.closest(".profile-dropdown")) {
    isDropdownOpen.value = false;
  }
};

// Add and remove event listener
if (isLoggedIn.value) {
  document.addEventListener("click", closeDropdown);
}
</script>

<template>
  <nav class="bg-gray-800 p-4 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Left side: Logo and Navigation -->
        <div class="flex items-center space-x-8">
          <!-- Logo -->
          <router-link
            to="/"
            class="text-xl font-bold text-blue-500 hover:text-blue-400 transition duration-300"
          >
            Library App
          </router-link>
          <router-link
            to="/"
            class="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            :class="{ 'text-blue-400': route.path === '/' }"
          >
            Home
          </router-link>

          <!-- Right side: Auth -->
          <div v-if="isLoggedIn" class="flex space-x-6">
            <router-link
              to="/books"
              class="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              :class="{ 'text-blue-400': route.path === '/books' }"
            >
              Books
            </router-link>
            <router-link
              to="/genres"
              class="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              :class="{ 'text-blue-400': route.path === '/genres' }"
            >
              Genres
            </router-link>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="flex items-center space-x-4">
          <!-- Conditional Rendering for Login and Register -->
          <router-link
            v-if="shouldShowLogin"
            to="/login"
            class="text-blue-500 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
          >
            Login
          </router-link>
          <router-link
            v-if="shouldShowRegister"
            to="/register"
            class="text-blue-500 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
          >
            Register
          </router-link>

          <!-- Profile Dropdown for Authenticated Users -->
          <div v-if="isLoggedIn" class="relative profile-dropdown">
            <button @click="toggleDropdown" class="focus:outline-none">
              <div
                class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center uppercase font-bold"
              >
                {{ userEmail[0] }}
              </div>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 border"
            >
              <div class="py-1">
                <div class="px-4 py-2 text-sm text-gray-700 border-b">
                  {{ userEmail }}
                </div>
                <button
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.profile-dropdown {
  position: relative;
}
</style>
