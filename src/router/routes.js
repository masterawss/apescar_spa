

const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'index' },
      { path: '/ofertas', component: () => import('pages/Oferta/Index.vue'), name: 'oferta.index', meta: { requiresAuth: true } },
      { path: '/oferta/:id', component: () => import('pages/Oferta/Show.vue'), name: 'oferta.show', meta: { requiresAuth: true } },
      { path: '/crear-oferta', component: () => import('pages/Oferta/Create.vue'), name: 'oferta.create', meta: { requiresAuth: true } },
      { path: '/demandas', component: () => import('pages/Demanda/Index.vue'), name: 'demanda.index', meta: { requiresAuth: true } },
      { path: '/crear-demanda', component: () => import('pages/Demanda/Create.vue'), name: 'demanda.create', meta: { requiresAuth: true } },

      { path: '/empresa/:id', component: () => import('pages/Empresa/Show.vue'), name: 'empresa.show', meta: { requiresAuth: true } },

      { path: '/register', component: () => import('pages/Register/Index.vue'), name: 'register' },

      { path: '/empresa/perfil', component: () => import('pages/Perfil/Index.vue'), name: 'perfil.index' }
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
