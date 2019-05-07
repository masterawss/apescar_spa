// import something here
import store from '../store'
// "async" is optional
export default async ({ router /* app, router, Vue, ... */ }) => {
  // something to do
  router.beforeEach( (to, from, next) => {
    if ( to.meta.requiresAuth && store().state.auth.info.jwt == null ) {
      return router.push({ name: 'index' });
    }
    return next();
  })
}