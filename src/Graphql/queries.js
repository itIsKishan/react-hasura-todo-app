import {gql} from '@apollo/client'

export const getAllTodo = gql`
  query GetTodo{
    todo_app(order_by: {created_at: asc}){
      _id
      title
      completed
      created_at
    }
  }
`

