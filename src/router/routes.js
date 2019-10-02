

const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'index' },
      { path: '/ofertas', component: () => import('pages/Oferta/Index.vue'), name: 'oferta.index', meta: { requiresAuth: true } },
      { path: '/oferta/:id', component: () => import('pages/Oferta/Show.vue'), name: 'oferta.show', meta: { requiresAuth: true } },
      { path: '/crear-oferta', component: () => import('pages/Oferta/Create.vue'), name: 'oferta.create', meta: { requiresAuth: true } },
      { path: '/editar-oferta/:id', component: () => import('pages/Oferta/Create.vue'), name: 'oferta.edit', meta: { requiresAuth: true } },
      { path: '/demandas', component: () => import('pages/Demanda/Index.vue'), name: 'demanda.index', meta: { requiresAuth: true } },
      { path: '/crear-demanda', component: () => import('pages/Demanda/Create.vue'), name: 'demanda.create', meta: { requiresAuth: true } },
      { path: '/editar-demanda/:id', component: () => import('pages/Demanda/Create.vue'), name: 'demanda.edit', meta: { requiresAuth: true } },


      { path: '/empresas', component: () => import('pages/Empresa/Index.vue'), name: 'empresa.index', meta: { requiresAuth: true } },
      { path: '/empresa/:id', component: () => import('pages/Empresa/Show.vue'), name: 'empresa.show', meta: { requiresAuth: true } },

      { path: '/register', component: () => import('pages/Register/Index.vue'), name: 'register' },
      { path: '/configuracion', component: () => import('pages/Configuracion/Index.vue'), name: 'configuracion.index' },
      { path: '/configuracion/cambiar_password', component: () => import('pages/Configuracion/CambiarPassword.vue'), name: 'configuracion.change_password' },

      { path: '/pedidos', component: () => import('pages/Pedido/Show.vue'), name: 'pedidos.show', meta: { requiresAuth: true } },

      { path: '/notificaciones', component: () => import('pages/Notificaciones/Show.vue'), name: 'notificaciones.show', meta: { requiresAuth: true } },
      { path: '/terminos-y-condiciones-de-uso', component: () => import('pages/TerminosYCondiciones.vue'), name: 'terminos' },

      // { path: '/empresa/perfil', component: () => import('pages/Perfil/Index.vue'), name: 'perfil.index' }
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
