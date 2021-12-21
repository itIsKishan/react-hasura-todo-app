import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from "@apollo/client";
import { getAllTodo } from '../Graphql/queries';
import { deleteTodo, updateTodo } from '../Graphql/mutation';

const ShowTodo = () =>{
    const [todoData,setTodoData] = useState([])
    
    const {data,err,loading} = useQuery(getAllTodo)

    const [delete_todo_app,{ Deldata, Delerr, Delloading}] = useMutation(deleteTodo,{
        refetchQueries : [
            {query : getAllTodo},
            'GetTodo'
        ]
    })

    const [update_todo_app,{ updData,updErr,updLoading}] = useMutation(updateTodo,{
        refetchQueries : [
            { query : getAllTodo },
            'GetTodo'
        ]
    })

    const handleInputChange = (e,_id) =>{
        console.log('change', e.target.checked)
        console.log('id',_id)

        const data = {
            id : _id,
            isCompleted : e.target.checked
        }
        console.log('data',data)
        update_todo_app({
            variables : data
        })
    }

    const handleDelete = (e,id) =>{
        console.log('id',typeof id)
        delete_todo_app({
            variables:{
                id : id
            }
        })
    }
    useEffect(() =>{
        if(data){
            let result = data.todo_app
            console.log('data',data)
            setTodoData(result)
        } else if(err){
            console.log('error occured',err)
        } else if(loading){
            console.log('loading to get data',loading)
        }
    },[data])

    useEffect(() =>{
        if(Deldata){
            console.log('delete record',Deldata)
        } else if(Delerr){
            console.log('error',Delerr)
        } else if(Delloading){
            console.log('loading delete',Delloading)
        }
    },[Deldata])

    useEffect(() =>{
        if(updData){
            console.log('updated record',updData)
        } else if(updErr){
            console.log('upd err',updErr)
        } else if(updLoading){
            console.log('upd loading',updLoading)
        }
    },[updData])

    return(
        <div>
            {
                todoData.map((ele,i) =>{
                    if(ele.completed){
                        return(
                            <ul key = {ele._id}>
                                <li>
                                    <input type = 'checkbox' checked = {true} onChange = {(e) =>{ handleInputChange(e,ele._id)}}/>
                                    <del>{ele.title}</del>
                                    <button onClick = {(e) =>{handleDelete(e,ele._id)}}>Delete</button>
                                </li>
                            </ul>
                        )
                    } else {
                        return(
                           <ul key = {i}>
                               <li>
                                   <input type = 'checkbox' checked = {false} onChange={(e) =>{handleInputChange(e,ele._id)}} />
                                   {ele.title}
                                   <button onClick={(e) =>{handleDelete(e,ele._id)}}>Delete</button>
                               </li>
                           </ul>
                        )
                    }
                    
                })
            }
        </div>
    )
}

export default ShowTodo