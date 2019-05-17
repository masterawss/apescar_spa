// import something here
import store from '../store'

import {apolloClient } from './apollo'
import gql from 'graphql-tag'
// "async" is optional
export default async ({ router /* app, router, Vue, ... */ }) => {
  // something to do
  router.beforeEach( (to, from, next) => {
    console.log('Entrando al middleware');
    
    if ( to.meta.requiresAuth ) {
      console.log('Respuesta del middleware', store().state.auth.token );
      apolloClient.query({
        query: gql`query($token: String){
          autorizacion(token: $token){
            id
            nombre
          }
        }`,
        variables: {
          token: store().state.auth.token
        }
      }).then(res => {
        if(res.data.autorizacion){
          console.log('peticion de login desde servidor: ', res);
          return next()
        }else{
          store().commit('auth/logout')
          return router.push({ name: 'index' });
        }
      }).catch(e => {
        console.log('Error', e);
      })
    }else{
      return next();
    }
  })
}

// try {
//   let res = await apolloClient.query({
//     query: gql`query($token: String){
//       autorizacion(token: $token){
//         id
//         nombre
//       }
//     }`,
//     variables: {
//       token: store().state.auth.token
//     }
//   })
//   console.log('peticion de login desde servidor: ', res);
//   return router.push({ name: 'index' });
// } catch (error) {
//   console.log('Error', error);
// }