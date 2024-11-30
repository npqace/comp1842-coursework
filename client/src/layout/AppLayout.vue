<script setup>
import Navbar from "./Navbar.vue";
</script>

<template>
  <div class="min-h-screen h-screen flex flex-col bg-gray-900 text-white">
    <Navbar />
    <div class="flex-grow flex items-center justify-center">
      <div class="w-full max-w-md">
        <div class="bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>