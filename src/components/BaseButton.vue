<template>
  <button class="base-button">
    <slot />
  </button>
</template>

<script setup></script>

<style lang="scss" scoped>
.base-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>
