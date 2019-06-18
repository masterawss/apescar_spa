import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo';
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context';

import API from './env.json'

import store from '../store'

import { createUploadLink } from 'apollo-upload-client'

// console.log('API::::::::::::: ', API.BASE_URL_API);


const httpLink = createUploadLink({ uri: API.BASE_URL_API + 'graphql', fetch: fetch })

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');
    var token = store().state.auth.token
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  errorHandler ({ graphQLErrors, networkError }) {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${ JSON.stringify(locations) }, Path: ${path}`
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
