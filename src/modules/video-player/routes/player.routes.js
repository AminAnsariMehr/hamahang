export default [
  {
    path: '/player/:id',
    name: 'Player',
    component: () => import('../pages/PlayerView.vue')
  }
]