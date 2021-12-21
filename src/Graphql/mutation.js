import {gql} from '@apollo/client'

export const insertTodo = gql`
  mutation ($title: String!){
    insert_todo_app(objects: [{title: $title}]){
       returning{
        _id
        title
        completed
        created_at
       }
    }
  }
`

export const deleteTodo = gql`
  mutation($id:uuid!){
    delete_todo_app(where:{_id:{_eq:$id}}){
      returning{
        _id
        title
      }
    }
  }
`

export const updateTodo = gql`
  mutation($id:uuid!,$isCompleted:Boolean!){
    update_todo_app(where:{_id:{_eq:$id}},_set: {completed: $isCompleted}){
      returning{
        _id
        title
      }
    }
  }
`