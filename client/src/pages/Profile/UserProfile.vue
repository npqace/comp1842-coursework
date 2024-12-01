// client/src/pages/UserProfile.vue
<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import api from "../../utils/axios";
import ProfileForm from "../../components/Profile/ProfileForm.vue";
import DeleteAccountModal from "../../components/Profile/DeleteAccountModal.vue";

const store = useStore();
const router = useRouter();

const user = ref(null);
const loading = ref(true);
const error = ref(null);
const showForm = ref(false);

const isEditing = ref(false);
const showDeleteModal = ref(false);

// Fetch user details
const fetchUserProfile = async () => {
  try {
    const response = await api.get("/profile");
    user.value = response.data;
    loading.value = false;
  } catch (err) {
    error.value = "Failed to load user profile";
    loading.value = false;
  }
};

// Handle profile update
const handleUpdate = async (updatedData) => {
  try {
    await api.put("/profile", updatedData);
    await fetchUserProfile();
    showForm.value = false;
  } catch (err) {
    error.value = err.response?.data?.msg || "Failed to update profile";
  }
};

// Handle account deletion
const confirmDeleteAccount = () => {
  showDeleteModal.value = true;
};

// Handle successful account deletion
const onAccountDeleted = () => {
  store.commit("clearAuth"); // Clear the authentication state
  router.push("/login"); // Redirect to the login page
};

onMounted(() => {
  fetchUserProfile();
});
</script>

<template>
  <div class="max-w-2xl mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold mb-6">User Profile</h1>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">Loading...</div>

    <!-- Error State -->
    <div v-if="error" class="bg-red-500 text-white p-3 rounded mb-4">
      {{ error }}
    </div>

    <!-- User Information -->
    <div v-if="user && !loading" class="space-y-4">
      <div class="border-b border-gray-700 pb-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="text-gray-400">Name:</div>
          <div>{{ user.name }}</div>

          <div class="text-gray-400">Username:</div>
          <div>{{ user.username }}</div>

          <div class="text-gray-400">Email:</div>
          <div>{{ user.email }}</div>
        </div>
      </div>

      <div class="flex justify-between pt-4">
        <button
          @click="showForm = true"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
        >
          Edit Profile
        </button>

        <button
          @click="confirmDeleteAccount"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
        >
          Delete Account
        </button>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <DeleteAccountModal
      v-if="showDeleteModal"
      @close="showDeleteModal = false"
      @account-deleted="onAccountDeleted"
    />

    <!-- Edit Profile Form -->
    <ProfileForm
      :show="showForm"
      :user="user"
      @submit="handleUpdate"
      @cancel="showForm = false"
    />
  </div>
</template>
