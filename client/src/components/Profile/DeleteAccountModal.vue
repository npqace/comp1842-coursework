<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import api from '../../utils/axios';

const emit = defineEmits(['close', 'account-deleted']);
const isDeleting = ref(false);
const error = ref('');
const router = useRouter();
const store = useStore();

const handleDelete = async () => {
  try {
    isDeleting.value = true;
    await api.delete('/profile');
    emit('account-deleted');
    store.commit('clearAuth'); // Clear the authentication state
    router.push('/login'); // Redirect to the login page
  } catch (err) {
    error.value = 'Failed to delete account';
    console.log(err);
  } finally {
    isDeleting.value = false;
  }
};
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-gray-800 p-6 rounded-lg w-96">
      <h2 class="text-2xl mb-4">Delete Account</h2>
      <p class="text-gray-300 mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>

      <div v-if="error" class="bg-red-500 text-white p-3 rounded mb-4">
        {{ error }}
      </div>

      <div class="flex justify-end space-x-2">
        <button
          @click="$emit('close')"
          class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-300"
          :disabled="isDeleting"
        >
          Cancel
        </button>
        <button
          @click="handleDelete"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
          :disabled="isDeleting"
        >
          {{ isDeleting ? 'Deleting...' : 'Delete Account' }}
        </button>
      </div>
    </div>
  </div>
</template>