<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  book: {
    type: Object,
    required: true
  },
  genres: {
    type: Array,
    default: () => []
  },
  genreError: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['save', 'cancel']);

// Create a local copy of the book to avoid direct mutation of props
const editedBook = ref({ ...props.book });

// Watch for changes in the prop and update local copy
watch(() => props.book, (newBook) => {
  editedBook.value = { ...newBook };
}, { deep: true });

const onSave = () => {
  emit('save', editedBook.value);
};
</script>

<template>
  <form class="space-y-4" @submit.prevent="onSave">
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
      <select
        v-model="editedBook.genreName"
        class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
      >
        <option value="" disabled>Select a genre</option>
        <option
          v-for="genre in genres"
          :key="genre._id"
          :value="genre.name"
        >
          {{ genre.name }}
        </option>
      </select>
      <span v-if="genreError" class="text-red-500 text-sm">
        {{ genreError }}
      </span>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-300">Reading Status</label>
      <select
        v-model="editedBook.status"
        class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
      >
        <option value="Want to Read">Want to Read</option>
        <option value="Reading">Reading</option>
        <option value="Read">Read</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-300">Description</label>
      <textarea
        v-model="editedBook.description"
        rows="4"
        class="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
      ></textarea>
    </div>

    <div class="flex justify-end space-x-4">
      <button
        type="button"
        @click="$emit('cancel')"
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
</template>