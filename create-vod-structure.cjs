// create-vod-structure.js
const fs = require('fs')
const path = require('path')

// مسیر پروژه - می‌توانید آن را تغییر دهید
const PROJECT_ROOT = './vod-pwa-project'

// ساختار فولدرها و فایل‌ها
const structure = {
  src: {
    app: {
      core: {
        http: {
          'axios.instance.js': `import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'https://api.yourdomain.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient`,
          'interceptors.js': `// HTTP interceptors`,
        },
        services: {
          'api.service.js': `// Core API service`,
          'storage.service.js': `// Storage service`,
        },
        utils: {
          'date.utils.js': `// Date utilities`,
          'string.utils.js': `// String utilities`,
        },
        constants: {
          'app.constants.js': `// Application constants`,
          'http.constants.js': `// HTTP constants`,
        },
        helpers: {
          'auth.helper.js': `// Authentication helpers`,
          'validation.helper.js': `// Validation helpers`,
        },
      },
      shared: {
        components: {
          'BaseButton.vue': `<template>
  <button class="base-button">
    <slot />
  </button>
</template>

<script setup></script>

<style scoped>
.base-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>`,
          'BaseInput.vue': `<template>
  <input class="base-input" v-bind="$attrs">
</template>

<script setup></script>

<style scoped>
.base-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>`,
          'BaseModal.vue': `<template>
  <div class="modal-overlay" v-if="visible">
    <div class="modal-content">
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>`,
        },
        layouts: {
          'MainLayout.vue': `<template>
  <div class="main-layout">
    <header>Main Header</header>
    <main>
      <slot />
    </main>
    <footer>Main Footer</footer>
  </div>
</template>

<script setup></script>`,
          'AuthLayout.vue': `<template>
  <div class="auth-layout">
    <div class="auth-container">
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>`,
        },
        styles: {
          '_variables.scss': `// SCSS Variables`,
          '_mixins.scss': `// SCSS Mixins`,
          '_utilities.scss': `// Utility classes`,
        },
        assets: {
          icons: {},
          images: {},
        },
      },
      router: {
        'index.js': `import { createRouter, createWebHistory } from 'vue-router'
import { getModuleRoutes } from './routes'

const routes = [
  ...getModuleRoutes(),
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router`,
        'routes.js': `// Module route aggregator`,
      },
    },
    modules: {
      auth: {
        'auth.module.js': `import { defineAsyncComponent } from 'vue'

export class AuthModule {
  constructor() {
    this.name = 'auth'
  }

  install(app) {
    // Install module components and services
  }

  async initialize() {
    // Initialize module
  }
}

export const authModule = new AuthModule()`,
        components: {
          'LoginForm.vue': `<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="form.email" type="email" placeholder="Email" required>
      <input v-model="form.password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup></script>`,
          'RegisterForm.vue': `<template>
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

<script setup></script>`,
        },
        pages: {
          'Login.vue': `<template>
  <div class="login-page">
    <LoginForm />
  </div>
</template>

<script setup></script>`,
          'Register.vue': `<template>
  <div class="register-page">
    <RegisterForm />
  </div>
</template>

<script setup></script>`,
        },
        services: {
          'auth.service.js': `// Auth service implementation`,
        },
        repositories: {
          'auth.repository.js': `// Auth repository implementation`,
        },
        stores: {
          'auth.store.js': `import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false
  })
})`,
        },
        routes: {
          'auth.routes.js': `export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/Register.vue')
  }
]`,
        },
        guards: {
          'auth.guard.js': `// Auth route guards`,
        },
      },
      player: {
        'player.module.js': `export class PlayerModule {
  constructor() {
    this.name = 'player'
  }
}

export const playerModule = new PlayerModule()`,
        components: {
          'VideoPlayer.vue': `<template>
  <div class="video-player">
    <video ref="videoElement" controls></video>
  </div>
</template>

<script setup></script>`,
          'PlayerControls.vue': `<template>
  <div class="player-controls">
    <!-- Player controls -->
  </div>
</template>

<script setup></script>`,
        },
        pages: {
          'PlayerView.vue': `<template>
  <div class="player-view">
    <VideoPlayer />
  </div>
</template>

<script setup></script>`,
        },
        services: {
          'player.service.js': `// Player service`,
          'streaming.service.js': `// Streaming service`,
        },
        repositories: {
          'player.repository.js': `// Player repository`,
        },
        stores: {
          'player.store.js': `import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    currentVideo: null,
    isPlaying: false
  })
})`,
        },
        routes: {
          'player.routes.js': `export default [
  {
    path: '/player/:id',
    name: 'Player',
    component: () => import('../pages/PlayerView.vue')
  }
]`,
        },
        utils: {
          'player.utils.js': `// Player utilities`,
        },
      },
      content: {
        'content.module.js': `export class ContentModule {
  constructor() {
    this.name = 'content'
  }
}`,
        components: {
          'MovieCard.vue': `<template>
  <div class="movie-card">
    <div class="movie-poster">
      <img :src="movie.poster" :alt="movie.title">
    </div>
    <div class="movie-info">
      <h3>{{ movie.title }}</h3>
      <p>{{ movie.year }}</p>
    </div>
  </div>
</template>

<script setup></script>`,
          'ContentGrid.vue': `<template>
  <div class="content-grid">
    <slot />
  </div>
</template>

<script setup></script>`,
        },
        pages: {
          'Home.vue': `<template>
  <div class="home-page">
    <h1>Welcome to VOD</h1>
  </div>
</template>

<script setup></script>`,
        },
        services: {
          'content.service.js': `// Content service`,
        },
        repositories: {
          'content.repository.js': `// Content repository`,
        },
        stores: {
          'content.store.js': `import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', {
  state: () => ({
    movies: [],
    series: []
  })
})`,
        },
        routes: {
          'content.routes.js': `export default [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  }
]`,
        },
      },
      user: {
        'user.module.js': `export class UserModule {
  constructor() {
    this.name = 'user'
  }
}`,
        components: {
          'UserProfile.vue': `<template>
  <div class="user-profile">
    <h2>User Profile</h2>
  </div>
</template>

<script setup></script>`,
        },
        pages: {
          'Profile.vue': `<template>
  <div class="profile-page">
    <UserProfile />
  </div>
</template>

<script setup></script>`,
        },
        services: {
          'user.service.js': `// User service`,
        },
        repositories: {
          'user.repository.js': `// User repository`,
        },
        stores: {
          'user.store.js': `import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null,
    subscriptions: []
  })
})`,
        },
        routes: {
          'user.routes.js': `export default [
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../pages/Profile.vue')
  }
]`,
        },
      },
      interaction: {
        'interaction.module.js': `export class InteractionModule {
  constructor() {
    this.name = 'interaction'
  }
}`,
        components: {
          'CommentSection.vue': `<template>
  <div class="comment-section">
    <h3>Comments</h3>
  </div>
</template>

<script setup></script>`,
        },
        pages: {
          'Comments.vue': `<template>
  <div class="comments-page">
    <CommentSection />
  </div>
</template>

<script setup></script>`,
        },
        services: {
          'comment.service.js': `// Comment service`,
          'rating.service.js': `// Rating service`,
        },
        repositories: {
          'interaction.repository.js': `// Interaction repository`,
        },
        stores: {
          'interaction.store.js': `import { defineStore } from 'pinia'

export const useInteractionStore = defineStore('interaction', {
  state: () => ({
    comments: [],
    ratings: []
  })
})`,
        },
        routes: {
          'interaction.routes.js': `export default [
  {
    path: '/comments/:contentId',
    name: 'Comments',
    component: () => import('../pages/Comments.vue')
  }
]`,
        },
      },
    },
    pwa: {
      'service-worker.js': `// PWA Service Worker`,
      'manifest.js': `// PWA Manifest`,
      'offline.js': `// Offline support`,
    },
    assets: {
      icons: {},
      images: {},
      fonts: {},
    },
    'main.js': `import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './app/router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app)`,
    'App.vue': `<template>
  <router-view />
</template>

<script setup></script>`,
    'env.d.ts': `/// <reference types="vite/client" />`,
  },
}

// تابع ایجاد فولدر و فایل
function createStructure(basePath, structure) {
  for (const [name, content] of Object.entries(structure)) {
    const fullPath = path.join(basePath, name)

    if (typeof content === 'string') {
      // ایجاد فایل
      fs.writeFileSync(fullPath, content, 'utf8')
      console.log(`Created file: ${fullPath}`)
    } else if (typeof content === 'object') {
      // ایجاد فولدر
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true })
        console.log(`Created directory: ${fullPath}`)
      }
      // ایجاد محتویات فولدر
      createStructure(fullPath, content)
    }
  }
}

// اجرای اسکریپت
console.log('Creating VOD PWA project structure...')
console.log(`Project root: ${PROJECT_ROOT}`)

if (!fs.existsSync(PROJECT_ROOT)) {
  fs.mkdirSync(PROJECT_ROOT, { recursive: true })
}

createStructure(PROJECT_ROOT, structure)

console.log('\n✅ Project structure created successfully!')
console.log('\n📁 Next steps:')
console.log('1. cd vod-pwa-project')
console.log('2. npm install')
console.log('3. npm install vue@next vue-router@4 pinia axios')
console.log('4. npm run dev')
