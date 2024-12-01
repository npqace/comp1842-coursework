<script setup>
import { ref, watch } from 'vue';

// Props definition
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  initialBook: {
    type: Object,
    default: () => ({
      title: '',
      author: '',
      genre: '',
      description: ''
    })
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

// Emits definition
const emit = defineEmits(['submit', 'cancel']);

// Reactive state for form input
const bookData = ref({ ...props.initialBook });

// Watch for changes in initialBook (when editing)
watch(() => props.initialBook, (newValue) => {
  bookData.value = { ...newValue };
}, { immediate: true });

// Form submission handler
const onSubmit = () => {
  // Validate required fields
  const requiredFields = ['title', 'author', 'genre'];
  const missingFields = requiredFields.filter(field => 
    !bookData.value[field] || bookData.value[field].trim() === ''
  );

  if (missingFields.length > 0) {
    alert(`Please fill in the following fields: ${missingFields.join(', ')}`);
    return;
  }

  // Emit submit event with book data
  emit('submit', bookData.value);
  
  // Reset form (optional, may be handled by parent component)
  bookData.value = { 
    title: '',
    author: '',
    genre: '',
    description: ''
  };
};

// Cancel form
const onCancel = () => {
  // Reset form and emit cancel event
  bookData.value = { ...props.initialBook };
  emit('cancel');
};
</script>

<template>
  <div 
    v-if="show" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-gray-800 p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
      <h2 class="text-2xl mb-4">
        {{ initialBook.title ? 'Edit Book' : 'Add New Book' }}
      </h2>
      
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label for="title" class="block mb-2">Title</label>
          <input 
            id="title"
            v-model="bookData.title"
            type="text"
            required
            class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter book title"
          />
        </div>

        <div>
          <label for="author" class="block mb-2">Author</label>
          <input 
            id="author"
            v-model="bookData.author"
            type="text"
            required
            class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter author name"
          />
        </div>

        <div>
          <label for="genre" class="block mb-2">Genre</label>
          <select
            id="genre"
            v-model="bookData.genre"
            required
            class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select a genre</option>
            <option 
              v-for="genre in genres" 
              :key="genre._id" 
              :value="genre._id"
            >
              {{ genre.name }}
            </option>
          </select>
          <span v-if="genreError" class="text-red-500 text-sm mt-1">
            {{ genreError }}
          </span>
        </div>

        <div>
          <label for="description" class="block mb-2">Description (Optional)</label>
          <textarea
            id="description"
            v-model="bookData.description"
            rows="4"
            class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter book description"
          ></textarea>
        </div>
        
        <div class="flex justify-end space-x-2">
          <button 
            type="button"
            @click="onCancel"
            class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            {{ initialBook.title ? 'Update' : 'Add' }} Book
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add any additional styling */
</style>