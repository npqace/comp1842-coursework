<script setup>
defineProps({
  book: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="space-y-4">
    <div>
      <h2 class="text-xl font-semibold text-blue-400">{{ book.title }}</h2>
      <p class="text-gray-300">by {{ book.author }}</p>
      <p class="text-gray-400 mt-2">Genre: {{ book.genre.name }}</p>
      <!-- <p class="text-gray-400 mt-2">
        Status:
        <span
          :class="{
            'text-red-500': book.status === 'Want to Read',
            'text-blue-500': book.status === 'Reading',
            'text-green-500': book.status === 'Read',
          }"
        >
          {{ book.status }}
        </span>
      </p> -->
      <p class="text-gray-400 mt-4">
        {{ book.description || "No description available" }}
      </p>
    </div>
  </div>
</template>