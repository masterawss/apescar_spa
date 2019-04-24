
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'index' },
      { path: '/ofertas', component: () => import('pages/Ofertas.vue'), name: 'oferta.index' },
      { path: '/oferta/:id', component: () => import('pages/Oferta.vue'), name: 'oferta.show' },
      { path: '/demandas', component: () => import('pages/Demandas.vue'), name: 'demanda.index' },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
