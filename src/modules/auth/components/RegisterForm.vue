<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="form.email" type="email" placeholder="Email" required>
      <input v-model="form.password" type="password" placeholder="Password" required>
      <input v-model="form.confirmPassword" type="password" placeholder="Confirm Password" required>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup></script>