<script setup>
import { computed } from "vue";
import Navbar from "./Navbar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isAuthPage = computed(
  () => route.path === "/login" || route.path === "/register"
);
</script>

<template>
  <div class="min-h-screen h-screen flex flex-col bg-gray-900 text-white">
    <Navbar />
    <div class="flex-grow flex items-center justify-center p-6">
      <div :class="['w-full', isAuthPage ? 'max-w-md' : 'max-w-7xl']">
        <div class="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
