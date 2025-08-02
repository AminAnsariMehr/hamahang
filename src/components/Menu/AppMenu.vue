<script setup>
import menuItems from '@/constans/menu'
</script>

<template>
  <nav class="navigation-menu">
    <ul class="menu-list">
      <li class="menu-item" v-for="menuItem in menuItems" :key="menuItem.id">
        <router-link class="menu-link" :to="menuItem.route">
          <img class="menu-icon" :src="menuItem.icon" :alt="menuItem.name" />
          <span class="menu-title">
            {{ menuItem.name }}
          </span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
