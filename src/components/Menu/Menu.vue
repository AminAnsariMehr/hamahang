<script setup>
const icons = ['/src/', '/src/', '/src/', '/src/', '/src/']

const menuItems = [
  { id: '1', name: 'صفحه اصلی', route: '/home', icon: 'src/assets/icons/menu/home-off.svg' },
  {
    id: '2',
    name: 'دسته بندی',
    route: '/categories',
    icon: './src/assets/icons/menu/',
  },
  { id: '3', name: 'جستجو', route: '/search', icon: './src/assets/icons/menu/' },
  {
    id: '4',
    name: 'لیست پخش',
    route: '/watchlist',
    icon: './src/assets/icons/menu/',
  },
  {
    id: '5',
    name: 'حساب کاربری',
    route: '/profile',
    icon: './src/assets/icons/menu/',
  },
]
</script>

<template>
  <nav>
    <ul>
      <li v-for="menuItem in menuItems" :key="menuItem.id">
        <router-link :to="menuItem.icon">
          <span>
            {{ menuItem.name }}
          </span>
          <img :src="menuItem.icon" alt="" />
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped></style>
