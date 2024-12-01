<script setup>
import { ref, onMounted } from "vue";
import api from "../../utils/axios";
import { useRouter } from "vue-router";
import Confirm from "../../components/alerts/ConfirmDialog.vue";
import BookForm from "../../components/Book/BookForm.vue";

const router = useRouter();
const books = ref([]);
const loading = ref(true);
const error = ref(null);
const showConfirmDelete = ref(false);
const bookToDelete = ref(null);
const showBookForm = ref(false);
const currentBook = ref(null);
const genres = ref([]);
const genreError = ref(null);

// Fetch books and genres
const fetchData = async () => {
  try {
    const [booksResponse, genresResponse] = await Promise.all([
      api.get("/books"),
      api.get("/genres"),
    ]);
    books.value = booksResponse.data;
    genres.value = genresResponse.data;
    loading.value = false;
  } catch (err) {
    error.value = "Failed to load books or genres";
    loading.value = false;
  }
};

const viewBookDetails = (bookId) => {
  router.push(`/books/${bookId}`);
};

const confirmDelete = (bookId) => {
  bookToDelete.value = bookId;
  showConfirmDelete.value = true;
};

const handleConfirmDelete = async () => {
  try {
    await api.delete(`/books/${bookToDelete.value}`);
    books.value = books.value.filter((book) => book._id !== bookToDelete.value);
    showConfirmDelete.value = false;
    bookToDelete.value = null;
  } catch (err) {
    error.value = "Failed to delete book";
  }
};

const handleCancelDelete = () => {
  showConfirmDelete.value = false;
  bookToDelete.value = null;
};

// Open form for adding a new book
const openAddBookForm = () => {
  currentBook.value = null;
  showBookForm.value = true;
};

// Open form for editing an existing book
const openEditBookForm = (book) => {
  currentBook.value = { 
    ...book, 
    genre: book.genre?._id || '' // Ensure genre ID is used
  };
  showBookForm.value = true;
};

// Handle book submission (add or update)
const handleBookSubmit = async (bookData) => {
  try {
    if (currentBook.value && currentBook.value._id) {
      // Update existing book
      const response = await api.put(
        `/books/${currentBook.value._id}`,
        bookData
      );
      const index = books.value.findIndex(
        (b) => b._id === currentBook.value._id
      );
      if (index !== -1) {
        books.value[index] = response.data;
      }
    } else {
      // Add new book
      const response = await api.post("/books", bookData);
      books.value.push(response.data);
    }
    showBookForm.value = false;
    currentBook.value = null;
    genreError.value = null;
    await fetchData();
  } catch (err) {
    // Handle specific genre-related errors
    if (err.response && err.response.data.message.includes("Genre")) {
      genreError.value = err.response.data.message;
    } else {
      error.value = "Failed to save book";
    }
  }
};

// Cancel book form
const handleCancelBookForm = () => {
  showBookForm.value = false;
  currentBook.value = null;
  genreError.value = null;
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Books Management</h1>
      <button
        @click="openAddBookForm"
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr v-for="book in books" :key="book._id" class="hover:bg-gray-700">
            <td class="px-6 py-4 whitespace-nowrap">{{ book.title }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ book.author }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ book.genre?.name || 'Unknown' }}</td>
            <td class="px-6 py-4 whitespace-nowrap space-x-2">
              <button
                @click="viewBookDetails(book._id)"
                class="text-blue-400 hover:text-blue-300"
              >
                View
              </button>
              <button
                @click="openEditBookForm(book)"
                class="text-yellow-400 hover:text-yellow-300"
              >
                Edit
              </button>
              <button
                @click="confirmDelete(book._id)"
                class="text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Confirmation Dialog for Delete -->
      <Confirm
        :show="showConfirmDelete"
        title="Delete Book"
        message="Are you sure you want to delete this book? This action cannot be undone."
        @confirm="handleConfirmDelete"
        @cancel="handleCancelDelete"
      />

      <!-- Empty State -->
      <div v-if="books.length === 0" class="text-center py-4 text-gray-400">
        No books available
      </div>
    </div>

    <!-- Book Form Modal -->
    <BookForm
      :show="showBookForm"
      :initial-book="
        currentBook || {
          title: '',
          author: '',
          genre: '',
          description: '',
        }
      "
      :genres="genres"
      :genre-error="genreError"
      @submit="handleBookSubmit"
      @cancel="handleCancelBookForm"
    />
  </div>
</template>

<style scoped>
/* Optional: Add any additional styling */
</style>