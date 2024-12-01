// client/src/components/Profile/ProfileForm.vue
<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  show: Boolean,
  user: Object,
});

const emit = defineEmits(["submit", "cancel"]);

const userData = ref({
  name: "",
  username: "",
  email: "",
  password: "", // Optional for update
});

// Initialize form with user data when available
const resetForm = () => {
  if (props.user) {
    userData.value = {
      name: "",
      username: "",
      email: "",
      password: "",
    };
  }
};

watch(() => props.user, resetForm, { immediate: true });

const onSubmit = () => {
  const updateData = {};

  // Only include fields that have been changed
  if (userData.value.name !== props.user.name) {
    updateData.name = userData.value.name;
  }
  if (userData.value.username !== props.user.username) {
    updateData.username = userData.value.username;
  }
  if (userData.value.email !== props.user.email) {
    updateData.email = userData.value.email;
  }
  if (userData.value.password) {
    updateData.password = userData.value.password;
  }

  emit("submit", updateData);
  resetForm();
};

const onCancel = () => {
  emit("cancel");
  resetForm();
};
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-gray-800 p-6 rounded-lg w-96">
      <h2 class="text-2xl mb-4">Edit Profile</h2>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label for="name" class="block mb-2">Name</label>
          <input
            id="name"
            v-model="userData.name"
            type="text"
            class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="username" class="block mb-2">Username</label>
          <input
            id="username"
            v-model="userData.username"
            type="text"
            class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="email" class="block mb-2">Email</label>
          <input
            id="email"
            v-model="userData.email"
            type="email"
            class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="password" class="block mb-2"
            >New Password</label
          >
          <input
            id="password"
            v-model="userData.password"
            type="password"
            class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Leave blank to keep current password"
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
            Update Profile
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
