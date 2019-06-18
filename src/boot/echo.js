// import something here
import VueEcho from 'vue-echo-laravel'
import Pusher from "pusher-js"

import store from '../store'

import API from './env.json'

var token = store().state.auth.token

// "async" is optional
export default async ({ Vue /* app, router, Vue, ... */ }) => {
  // something to do
  Vue.use(VueEcho, {
    authEndpoint : API.BASE_URL_API + 'broadcasting/auth',
    broadcaster: 'pusher',
    key: '11295f70c33fc0c62079',
    cluster: 'us2',
    encrypted: true,
    auth: {
      headers: {
          Authorization: 'Bearer ' + token,
      },
    },
  })
}
