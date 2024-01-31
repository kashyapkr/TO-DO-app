import React, { useEffect, useState } from 'react'
import { deleteTodo, getListOfTodos, setCompletedTodo, setInCompleted } from '../services/TodoService';
import { Link, useNavigate } from 'react-router-dom';
import { isAdminUser } from '../services/RegisterService';



const ListTodoComponent = () => {

    const navigator = useNavigate();

    const [todos, setTodos] = useState([]);
    const [toggled, setToggled] = useState([]);

    useEffect(() => {
        getAlltodos();
    }, []);


    let isAdmin = isAdminUser();

    function getAlltodos() {
        getListOfTodos().then((response) => {
            
            setTodos(response.data);
            console.log(todos);
        }).catch(error => console.log(error))

    }


    function handelUpdate(id) {
        navigator(`/update/${id}`);
    }

    function handelDelte(id) {
        deleteTodo(id).then(response => {
            console.log(response.data);
            getAlltodos();

        }).catch(error => console.log(error));
    }

    function handelCompleted(id,index) {
        const copyToggle = [...toggled];
        copyToggle[index] = !copyToggle[index];
        setToggled(copyToggle);
      
        if (copyToggle[index]) {
            setCompletedTodo(id).then(response => {
                getAlltodos();
                console.log(response.data);
               
            }).catch(error => console.log(error));
        }
        else {
            setInCompleted(id).then(response => {
                getAlltodos();
                console.log(response.data);
                
            }).catch(error => console.log(error));
        }


    }
    // function markCompleteTodo(id){
    //     setCompletedTodo(id).then((response) => {
    //         getAlltodos();
    //     }).catch(error => {
    //         console.error(error)
    //     })
    // }

    // function markInCompleteTodo(id){
    //     setInCompleted(id).then((response) => {
    //         getAlltodos();
    //     }).catch(error => {
    //         console.error(error)
    //     })
    // }



    return (
        <div className='container'>
            <br></br>
            <h1 className='text-center'>List of Todos</h1>
            <br></br>

            {
                isAdmin && <Link id='add-btn' className='btn btn-primary' to={'/add'}>Add a todo</Link>
            }

            <br></br>
            <br></br>
            <table className='table table-success table-hover'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Completed</th>
                        <th>Set Completed</th>
                        {
                            isAdmin && <th>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map((todo,index) => {
                            return (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.title}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.completed ? 'YES' : 'NO'}</td>
                                    <td>
                                        <div className="form-check form-switch" >
                                            <input className="form-check-input" value={todo.completed} checked={toggled[index]}  onChange={()=>handelCompleted(todo.id,index)}type="checkbox" role="switch" ></input>
                                            <label className="form-check-label">Completed</label>
                                        </div>
                                        {/* <button className='btn btn-success' onClick={() => markCompleteTodo(todo.id)} style={{ marginLeft: "10px" }} >Complete</button>
                                        <button className='btn btn-info' onClick={() => markInCompleteTodo(todo.id)} style={{ marginLeft: "10px" }} >In Complete</button> */}
                                    </td>

                                    <td>
                                        {
                                            isAdmin &&  <button className='btn btn-success' onClick={() => handelUpdate(todo.id)}>Update</button>
                                        }
                                        {
                                            isAdmin &&  <button className='btn btn-danger' style={{ marginLeft: '20px' }} onClick={() => handelDelte(todo.id)}>Delete</button>
                                        }
                                       
                                       
                                    </td>
                                </tr>
                            )
                        })}


                </tbody>
            </table>



        </div>
    )
}

export default ListTodoComponent