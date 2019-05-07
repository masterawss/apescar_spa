// import something here
import VuexPersist from 'vuex-persist'
// "async" is optional
// export default async ({ /* app, router, Vue, ... */ }) => {
//   // something to do
// }

export const vuexPersist = new VuexPersist({
  key: 'apescar',
  storage: localStorage
})
