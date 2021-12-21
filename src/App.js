import React from 'react'
import {ApolloClient,ApolloProvider,InMemoryCache} from '@apollo/client'
import CreateTodo from './components/createTodo'

const App = () =>{
  const client = new ApolloClient({
    cache : new InMemoryCache(),
    uri: "https://todo-app-graphql.hasura.app/v1/graphql",
    headers:{
      'x-hasura-access-key' : 'n4oYtPyuxmr1R8qYJRUeM6pOsaWlF3fWlmsMVXOfEs1Z5vZdg7fIxMbT399MXGL1'
    }
  })
  return(
    <ApolloProvider client = {client}>
      <div>
        <CreateTodo/>
      </div>
    </ApolloProvider>
  )
}

export default App