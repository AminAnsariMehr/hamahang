<script setup>
// import HamahangLogo from '@/assets/icons/header/hamahang-logo.svg'
import VueInlineSvg from 'vue-inline-svg'
import logoPath from './../../assets/icons/header/hamahang-logo.svg?component'
</script>

<template>
  <div>
    <!-- <HamahangLogo /> -->
    <VueInlineSvg :src="logoPath" />
  </div>
</template>
