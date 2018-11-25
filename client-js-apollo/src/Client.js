import React from 'react'
import {HttpLink} from 'apollo-link-http'
import {onError} from 'apollo-link-error'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloLink} from 'apollo-link'
import ApolloClient from 'apollo-client/ApolloClient'
import ApolloProvider from 'react-apollo/ApolloProvider'

const GITHUB_API = 'https://api.github.com/graphql'
const GITHUB_KEY = '4f345abf8189735e4966e8f594b9fee747cd7f62'

const httpLink = new HttpLink({
  uri: GITHUB_API,
  headers: {
    Authorization: `Bearer ${GITHUB_KEY}`
  }
})

const errorLink = new onError(({graphQLErrors, networkError}) => {
  console.log('error handler')
  console.error(graphQLErrors)
  console.error(networkError)
})

const link = ApolloLink.from([errorLink, httpLink])

const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache
})

export default function Client (props) {
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  )
}
