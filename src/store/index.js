import Vue from 'vue'
import Vuex from 'vuex'

import {vuexPersist} from '../boot/VuexPersist.js'
// import example from './module-example'

import auth from './auth'
import filtro_oferta from './filtro_oferta'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      auth,
      filtro_oferta
    },
    plugins: [vuexPersist.plugin],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
