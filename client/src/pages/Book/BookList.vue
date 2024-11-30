<script setup>
import { ref, onMounted } from "vue";
import api from "../../utils/axios";
import { useRouter } from "vue-router";

const router = useRouter();
const books = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchBooks = async () => {
  try {
    const response = await api.get("/books");
    books.value = response.data;
    loading.value = false;
  } catch (err) {
    error.value = "Failed to load books";
    loading.value = false;
  }
};

const viewBookDetails = (bookId) => {
  router.push(`/books/${bookId}`);
};

const deleteBook = async (bookId) => {
  try {
    await api.delete(`/books/${bookId}`);
    books.value = books.value.filter((book) => book._id !== bookId);
  } catch (err) {
    console.log({ msg: "Failed to delete book", err });
  }
};

onMounted(() => {
  fetchBooks();
});
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Books Management</h1>
      <button
        @click="router.push('/books')"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
      >
        Add New Book
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">Loading books...</div>

    <!-- Error State -->
    <div v-else-if="error" class="text-red-500 text-center py-4">
      {{ error }}
    </div>

    <!-- Books Table -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Author
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Genre
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr v-for="book in books" :key="book._id" class="hover:bg-gray-700">
            <td class="px-6 py-4 whitespace-nowrap">{{ book.title }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ book.author }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ book.genre.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="{
                  'text-red-400': book.status === 'Want to Read',
                  'text-blue-400': book.status === 'Reading',
                  'text-green-400': book.status === 'Read',
                }"
              >
                {{ book.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap space-x-2">
              <button
                @click="viewBookDetails(book._id)"
                class="text-blue-400 hover:text-blue-300"
              >
                View
              </button>
              <button
                @click="deleteBook(book._id)"
                class="text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="books.length === 0" class="text-center py-4 text-gray-400">
        No books available
      </div>
    </div>
  </div>
</template>
