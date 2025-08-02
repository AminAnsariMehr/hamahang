<script setup>
import VueInlineSvg from 'vue-inline-svg'
import AppLogo from '@/components/Header/AppLogo.vue'
import walletIcon from './../../assets/icons/header/wallet-icon.svg'
import HeaderButton from '../HeaderButton.vue'
</script>

<template>
  <header class="app-header">
    <app-logo></app-logo>
    <header-button>
      <template #header-btn>
        <VueInlineSvg :src="walletIcon" />
        <span>خرید اشتراک</span>
      </template>
    </header-button>
  </header>
</template>
