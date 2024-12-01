<script setup>
import { ref, watch } from 'vue';

// Props definition
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  initialName: {
    type: String,
    default: ''
  }
});

// Emits definition
const emit = defineEmits(['submit', 'cancel']);

// Reactive state for form input
const genreName = ref('');

// Watch for changes in initialName (when editing)
watch(() => props.initialName, (newValue) => {
  genreName.value = newValue;
});

// Form submission handler
const onSubmit = () => {
  // Trim and validate genre name
  const trimmedName = genreName.value.trim();
  
  if (!trimmedName) {
    alert('Genre name cannot be empty');
    return;
  }

  // Emit submit event with genre name
  emit('submit', trimmedName);
  
  // Reset form
  genreName.value = '';
};

// Cancel form
const onCancel = () => {
  // Reset form and emit cancel event
  genreName.value = '';
  emit('cancel');
};
</script>

<template>
  <div 
    v-if="show" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-gray-800 p-6 rounded-lg w-96">
      <h2 class="text-2xl mb-4">
        {{ initialName ? 'Edit Genre' : 'Add New Genre' }}
      </h2>
      
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label for="genreName" class="block mb-2">Genre Name</label>
          <input 
            id="genreName"
            v-model="genreName"
            type="text"
            required
            class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :placeholder="initialName ? 'Edit genre name' : 'Enter genre name'"
          />
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
            {{ initialName ? 'Update' : 'Add' }} Genre
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add any additional styling */
</style>