<script setup>
import { ref } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'cancel']);

const genreName = ref('');

const handleSubmit = () => {
  emit('submit', genreName.value);
  genreName.value = ''; // Reset form
};

const handleCancel = () => {
  genreName.value = ''; // Reset form
  emit('cancel');
};
</script>

<template>
  <div v-if="show" class="bg-gray-700 p-4 rounded-lg">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-300">Genre Name</label>
        <input
          v-model="genreName"
          type="text"
          required
          class="mt-1 block w-full bg-gray-600 border border-gray-500 rounded-md shadow-sm py-2 px-3 text-white"
        />
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
</template>