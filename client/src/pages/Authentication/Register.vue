<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const name = ref("");
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const errors = ref([]);

    const validate = () => {
      errors.value = {};
      if (!name.value) errors.value.name = "Name is required";
      if (!username.value) errors.value.username = "Username is required";
      if (!email.value) errors.value.email = "Email is required";
      if (!password.value) errors.value.password = "Password is required";
      return Object.keys(errors.value).length === 0;
    };

    const handleSubmit = async () => {
      if (!validate()) return;

      try {
        await store.dispatch("register", {
          name: name.value,
          username: username.value,
          email: email.value,
          password: password.value,
        });
        console.log("Registration successful!");
        router.push("/login");
      } catch (error) {
        console.error(error);
      }
    };

    return {
      name,
      username,
      email,
      password,
      errors,
      handleSubmit,
    };
  },
};
</script>

<template>
  <h2 class="text-3xl font-extrabold mb-4 text-center">Create your account</h2>

  <form class="space-y-6" @submit.prevent="handleSubmit">
    <div>
      <label class="block text-sm font-medium text-gray-300">Name</label>
      <input
        type="text"
        v-model="name"
        class="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
      />
      <span v-if="errors.name" class="text-red-500 text-sm">{{
        errors.name
      }}</span>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-300">Username</label>
      <input
        type="text"
        v-model="username"
        class="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
      />
      <span v-if="errors.username" class="text-red-500 text-sm">{{
        errors.username
      }}</span>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-300">Email</label>
      <input
        type="email"
        v-model="email"
        class="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
      />
      <span v-if="errors.email" class="text-red-500 text-sm">{{
        errors.email
      }}</span>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-300">Password</label>
      <input
        type="password"
        v-model="password"
        class="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-700 text-white"
      />
      <span v-if="errors.password" class="text-red-500 text-sm">{{
        errors.password
      }}</span>
    </div>

    <div>
      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Register
      </button>
    </div>
    <div class="text-gray-400 mt-4 text-center">
      Already have an account?
      <router-link
        to="/login"
        class="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-700"
      >
        Login
      </router-link>
    </div>
  </form>
</template>
