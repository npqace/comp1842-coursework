<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// import axios from "axios";
import api from "../utils/axios";

const router = useRouter();
const recentBooks = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchRecentBooks = async () => {
  try {
    const response = await api.get("/books");
    // Sort books by creation date in descending order and get the top 5 recent books
    recentBooks.value = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
    loading.value = false;
  } catch (err) {
    error.value = "Failed to load books";
    loading.value = false;
  }
};

const viewBookDetails = (bookId) => {
  router.push(`/books/${bookId}`);
};

onMounted(() => {
  fetchRecentBooks();
});
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-center mb-8">Welcome to Library App</h1>

    <!-- Recent Books Section -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold mb-4">Recent Books</h2>

      <!-- Loading State -->
      <div v-if="loading" class="text-center">Loading books...</div>

      <!-- Error State -->
      <div v-else-if="error" class="text-red-500 text-center">
        {{ error }}
      </div>

      <!-- Books Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="book in recentBooks"
          :key="book._id"
          @click="viewBookDetails(book._id)"
          class="bg-gray-700 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-600 transition duration-300"
        >
          <h3 class="text-xl font-semibold text-blue-400">{{ book.title }}</h3>
          <p class="text-gray-300">by {{ book.author }}</p>
          <!-- <span
            :class="{
              'text-red-400': book.status === 'Want to Read',
              'text-blue-400': book.status === 'Reading',
              'text-green-400': book.status === 'Completed',
            }"
            class="text-sm"
          >
            {{ book.status }}
          </span> -->
        </div>
      </div>

      <!-- No Books State -->
      <div
        v-if="!loading && !error && recentBooks.length === 0"
        class="text-center"
      >
        No books available
      </div>
    </div>
  </div>
</template>
