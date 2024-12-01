<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "../../utils/axios";

import BookDetails from "../../components/Book/BookDetails.vue";
import BookForm from "../../components/Book/BookForm.vue";

const router = useRouter();
const route = useRoute();

const book = ref(null);
const loading = ref(true);
const error = ref(null);
const showForm = ref(false);
const genres = ref([]);
const genreLoading = ref(true);
const genreError = ref(null);

const fetchBook = async () => {
  try {
    const response = await api.get(`/books/${route.params.id}`);
    book.value = response.data;
    loading.value = false;
  } catch (err) {
    error.value = "Failed to load book details";
    loading.value = false;
  }
};

const fetchGenres = async () => {
  try {
    const response = await api.get("/genres");
    genres.value = response.data;
    genreLoading.value = false;
  } catch (err) {
    genreError.value = "Failed to load genres";
    genreLoading.value = false;
  }
};

const prepareEditBook = () => {
  showForm.value = true;
};

const cancelEdit = () => {
  showForm.value = false;
};

const handleSave = async (updatedBook) => {
  try {
    const response = await api.put(
      `/books/${route.params.id}`,
      updatedBook
    );
    book.value = response.data.book;
    showForm.value = false;
  } catch (err) {
    error.value = "Failed to update book";
  }
};

const handleDelete = async () => {
  if (confirm("Are you sure you want to delete this book?")) {
    try {
      await api.delete(`/books/${route.params.id}`);
      router.push("/books");
    } catch (err) {
      error.value = "Failed to delete book";
    }
  }
};

onMounted(() => {
  fetchBook();
  fetchGenres();
});
</script>

<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">Loading book details...</div>

    <!-- Error State -->
    <div v-else-if="error" class="text-red-500 text-center py-4">
      {{ error }}
    </div>

    <!-- Book Details -->
    <div v-else>
      <!-- Header and Action Buttons -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Book Details</h1>
        <div class="space-x-4">
          <button
            @click="prepareEditBook"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Edit
          </button>
          <button
            @click="handleDelete"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>

      <!-- View Mode -->
      <BookDetails
        v-if="!showForm && book" 
        :book="book" 
      />

      <!-- Edit Mode -->
      <BookForm 
        v-if="showForm && book"
        :show="showForm"
        :initial-book="{
          title: book.title,
          author: book.author,
          genreName: book.genre.name,
          description: book.description || ''
        }"
        :genres="genres"
        :genre-error="genreError"
        @submit="handleSave"
        @cancel="cancelEdit"
      />
    </div>
  </div>
</template>