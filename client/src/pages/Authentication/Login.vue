<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");
    const errors = ref({});
    const loginError = ref("");

    const validate = () => {
      errors.value = {};
      if (!username.value) errors.value.username = "Username is required";
      if (!password.value) errors.value.password = "Password is required";
      return Object.keys(errors.value).length === 0;
    };

    const handleSubmit = async () => {
      // Reset previous login error
      loginError.value = "";

      if (!validate()) return;
      try {
        await store.dispatch("login", {
          username: username.value,
          password: password.value,
        });
        console.log("Login successful!");
        router.push("/");
      } catch (error) {
        console.error(error);
        // Set login error message
        loginError.value = "Username or password is not correct";
      }
    };

    return {
      username,
      password,
      errors,
      loginError,
      handleSubmit,
    };
  },
};
</script>

<template>
  <h2 class="text-3xl font-extrabold mb-4 text-center">
    Log in to your account
  </h2>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <!-- Display login error message -->
    <div v-if="loginError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      {{ loginError }}
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-300">Username</label>
      <input
        type="text"
        v-model="username"
        class="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
      />
      <span v-if="errors.username" class="text-red-500 text-sm">{{ errors.username }}</span>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-300">Password</label>
      <input
        type="password"
        v-model="password"
        class="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
      />
      <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
    </div>
    <div>
      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Sign in
      </button>
    </div>
    <div class="text-gray-400 mt-4 text-center">
      Don't have an account?
      <router-link
        to="/register"
        class="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-700"
      >
        Register
      </router-link>
    </div>
  </form>
</template>