<script setup>
defineProps({
  show: Boolean,
  title: String,
  message: String
});

defineEmits(['confirm', 'cancel']);
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <div class="fixed inset-0 bg-black opacity-50"></div>
      <div class="relative bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
        <h3 class="text-xl font-bold mb-4">{{ title }}</h3>
        <p class="text-gray-300 mb-6">{{ message }}</p>
        <div class="flex justify-end space-x-4">
          <button
            @click="$emit('cancel')"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md"
          >
            Cancel
          </button>
          <button
            @click="$emit('confirm')"
            class="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>