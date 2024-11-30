<script setup>
import { ref, onMounted } from "vue";
import api from "../../utils/axios";
import GenreForm from "../../components/Genre/GenreForm.vue";

const genres = ref([]);
const loading = ref(true);
const error = ref(null);
const showForm = ref(false);
const newGenre = ref("");

const fetchGenres = async () => {
  try {
    const response = await api.get("/genres");
    genres.value = response.data;
    loading.value = false;
  } catch (err) {
    error.value = "Failed to load genres";
    loading.value = false;
  }
};

const handleGenreSubmit = async (name) => {
  try {
    await api.post("/genres", { name });
    showForm.value = false;
    await fetchGenres();
  } catch (err) {
    error.value = err.response?.data?.msg || "Failed to create genre";
  }
};

const deleteGenre = async (id) => {
  if (!confirm('Are you sure you want to delete this genre?')) return;

  try {
    await api.delete(`/genres/${id}`);
    await fetchGenres();
  } catch (err) {
    error.value = err.response?.data?.msg || 'Failed to delete genre';
  }
};

onMounted(() => {
  fetchGenres();
});
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Genres Management</h1>
      <button
        @click="showForm = true"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
      >
        Add Genre
      </button>
    </div>

    <!-- Error Display -->
    <div v-if="error" class="bg-red-500 text-white p-3 rounded">
      {{ error }}
    </div>

    <!-- New Genre Form -->
    <GenreForm
      :show="showForm"
      @submit="handleGenreSubmit"
      @cancel="showForm = false"
    />

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">Loading genres...</div>

    <!-- Genres Grid -->
    <div v-else class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="genre in genres"
        :key="genre._id"
        class="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
      >
        <span class="text-lg">{{ genre.name }}</span>
        <button
          @click="deleteGenre(genre._id)"
          class="text-red-400 hover:text-red-300"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="!loading && genres.length === 0"
      class="text-center py-4 text-gray-400"
    >
      No genres available
    </div>
  </div>
</template>
