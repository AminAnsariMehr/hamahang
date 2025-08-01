// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: () => import('@/views/HomeView.vue'),
//   },
//   {
//     path: '/category/:id',
//     name: 'category',
//     component: () => import('@/views/CategoryView.vue'),
//     props: true,
//   },
//   {
//     path: '/video/:id',
//     name: 'video-detail',
//     component: () => import('@/views/VideoDetailView.vue'),
//     props: true,
//   },
//   {
//     path: '/player/:id',
//     name: 'video-player',
//     component: () => import('@/views/PlayerView.vue'),
//     props: true,
//   },
//   {
//     path: '/search',
//     name: 'search',
//     component: () => import('@/views/SearchView.vue'),
//   },
//   {
//     path: '/profile',
//     name: 'profile',
//     component: () => import('@/views/ProfileView.vue'),
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/watchlist',
//     name: 'watchlist',
//     component: () => import('@/views/WatchlistView.vue'),
//     meta: { requiresAuth: true },
//   },

//   {
//     path: '/history',
//     name: 'history',
//     component: () => import('@/views/HistoryView.vue'), // باید این رو هم اضافه کنی
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/settings',
//     name: 'settings',
//     component: () => import('@/views/SettingsView.vue'), // باید این رو هم اضافه کنی
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/:pathMatch(.*)*',
//     name: 'not-found',
//     component: () => import('@/views/NotFoundView.vue'),
//   },
// ]

const routes = [
  {
    path: '/',
  },
]

export default routes
