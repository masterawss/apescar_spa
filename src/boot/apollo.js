import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo';
import { ApolloLink } from 'apollo-link'

import store from '../store'

import { createUploadLink } from 'apollo-upload-client'

// const httpLink = createHttpLink({ uri: 'http://192.168.43.29/apescar/public/graphql', fetch: fetch })


// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   // console.log(store().state.auth.info.length > 0);
  
//   // const token = store().state.auth.info.length > 0 ? store().state.auth.token : false

//   const token = store().state.auth.token

  
//   operation.setContext({
//     headers: {
//       authorization: token ? `Bearer ${token}` : null 
//     }
//   })
//   return forward(operation)
// })

const uri = "http://192.168.1.19/apescar/public/graphql"
const token = store().state.auth.token
const httpLink = createUploadLink({uri, 
  headers: {
    authorization: token ? `Bearer ${token}` : null 
  }

})

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  errorHandler ({ graphQLErrors, networkError }) {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  }
})
// "async" is optional
export default async ({ app, Vue }) => {
  // something to do
  Vue.use(VueApollo)
  app.apolloProvider = apolloProvider
}
