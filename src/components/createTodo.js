import React, { useState } from 'react'
import ShowTodo from './showTodo'
import { useMutation } from '@apollo/client'
import { insertTodo } from '../Graphql/mutation'
import { getAllTodo } from '../Graphql/queries'
const CreateTodo = () =>{
    const [ inputTodo, setInputTodo ] = useState('')

    const [insert_todo_app, { data, loading, error }] = useMutation(insertTodo,{
        refetchQueries: [
            { query : getAllTodo},
            'GetTodo'
        ]
    })

    if(loading){
        console.log('loading before create',loading)
    } else if(error){
        console.log('err',error)
    } else if(data){
        console.log('data',data)
    }

    const handleInputChange = (e) =>{
        setInputTodo(e.target.value)
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        insert_todo_app({ 
            variables : { title : inputTodo }
        })
        console.log('input todo',inputTodo)
        setInputTodo('')
    }
    return(
        <div>
            <form>
                <input type = 'text' value = {inputTodo} placeholder = 'Enter A Task' onChange = {handleInputChange}/>
                <input type = 'button' value = 'Add Todo' onClick={handleSubmit}/>
            </form>
            <ShowTodo/>
        </div>
    )
}

export default CreateTodo