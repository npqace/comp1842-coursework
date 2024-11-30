<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "../../utils/axios";

const router = useRouter();
const route = useRoute();
const book = ref(null);
const loading = ref(true);
const error = ref(null);
const isEditing = ref(false);

// Form data
const editedBook = ref({
  title: "",
  author: "",
  genreName: "",
  status: "Want to Read",
  description: "",
});

const fetchBook = async () => {
  try {
    const response = await api.get(`/books/${route.params.id}`);
    book.value = response.data;
    // Initialize edit form
    editedBook.value = {
      title: book.value.title,
      author: book.value.author,
      genreName: book.value.genre.name,
      status: book.value.status,
      description: book.value.description || "",
    };
    loading.value = false;
  } catch (err) {
    error.value = "Failed to load book details";
    loading.value = false;
  }
};

const handleEdit = () => {
  isEditing.value = true;
};

const handleCancel = () => {
  isEditing.value = false;
  // Reset form
  editedBook.value = {
    title: book.value.title,
    author: book.value.author,
    genreName: book.value.genre.name,
    description: book.value.description || "",
  };
};

const handleSave = async () => {
  try {
    const response = await axios.put(
      `http://localhost:3000/books/${route.params.id}`,
      editedBook.value
    );
    book.value = response.data.book;
    isEditing.value = false;
  } catch (err) {
    error.value = "Failed to update book";
  }
};

const handleDelete = async () => {
  if (confirm("Are you sure you want to delete this book?")) {
    try {
      await axios.delete(`http://localhost:3000/books/${route.params.id}`);
      router.push("/books");
    } catch (err) {
      error.value = "Failed to delete book";
    }
  }
};

onMounted(() => {
  fetchBook();
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
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Book Details</h1>
        <div class="space-x-4">
          <button
            v-if="!isEditing"
            @click="handleEdit"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Edit
          </button>
          <button
            v-if="!isEditing"
            @click="handleDelete"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>

      <!-- View Mode -->
      <div v-if="!isEditing" class="space-y-4">
        <div>
          <h2 class="text-xl font-semibold text-blue-400">{{ book.title }}</h2>
          <p class="text-gray-300">by {{ book.author }}</p>
          <p class="text-gray-400 mt-2">Genre: {{ book.genre.name }}</p>
          <p class="text-gray-400 mt-2">
            Status:
            <span
              :class="{
                'text-yellow-400': book.status === 'Unread',
                'text-blue-400': book.status === 'Reading',
                'text-green-400': book.status === 'Completed',
              }"
            >
              {{ book.status }}
            </span>
          </p>
          <p class="text-gray-400 mt-4">
            {{ book.description || "No description available" }}
          </p>
        </div>
      </div>

      <!-- Edit Mode -->
      <form v-else class="space-y-4" @submit.prevent="handleSave">
        <div>
          <label class="block text-sm font-medium text-gray-300">Title</label>
          <input
            v-model="editedBook.title"
            type="text"
            class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300">Author</label>
          <input
            v-model="editedBook.author"
            type="text"
            class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300">Genre</label>
          <input
            v-model="editedBook.genreName"
            type="text"
            class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300"
            >Reading Status</label
          >
          <select
            v-model="editedBook.status"
            class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
          >
            <option value="Unread">Unread</option>
            <option value="Reading">Reading</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300"
            >Description</label
          >
          <textarea
            v-model="editedBook.description"
            rows="4"
            class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
          ></textarea>
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="handleCancel"
            class="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
