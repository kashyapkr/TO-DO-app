import React, { useEffect, useState } from 'react'
import { addTodo, getTodo, updateTodo } from '../services/TodoService'
import { useNavigate, useParams } from 'react-router-dom';


const AddTodoComponent = () => {


    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const navigator = useNavigate();

    const todo = { title: title, description: description, completed: completed };

    const[todoError,setTodoError]= useState([ {title:'', description:''}])

    function validateError(){
        let valid = true;
        const copyError = [...todoError];

        if(title.trim()===''){
            copyError.title = 'Title should not be null';
            valid = false;
        }
        else{
            copyError.title='';
        }
        if(description.trim()===''){
            copyError.description='Description should not be null';
            valid= false;
        }else{
            copyError.description = '';
        }
        setTodoError(copyError);
        return valid;

    }



    const handelAddTodo = (e) => {
        e.preventDefault();
        
        if(id){
            updateTodo(id,todo).then(response=>{
                console.log(response.data);
                navigator('/todo');
            })

        }
        else if(validateError()){
            addTodo(todo).then(response => {
                console.log(response.data);
                navigator('/todo');
            }).catch(error => console.log(error));
    

        }
        else{
            console.log("Some error related to validation");
        }
        
        
    }
    function pageTitle(){
        if(id){
            return <h2 className='card-title'>Update Todo</h2>
        }else{
            return <h2 className='card-title'>Add a Todo</h2>
        }
    }

    useEffect(() => {
        if (id) {
            getTodo(id).then((response) => {
                console.log(response.data);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setCompleted(response.data.completed);

            }).catch(error => console.log(error));

        }

    }, [id])





    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-body'>
                            {
                                pageTitle()
                            }
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Title:
                                    </label>
                                    <input type="text" className={`form-control ${todoError.title ? 'is-invalid' : ''}`}  placeholder='Enter a new task' value={title} onChange={(e) => setTitle(e.target.value)}></input>
                                    {todoError.title && <div className='invalid-feedback'>{todoError.title}</div>}

                                </div>
                                <br></br>
                                <div className='form-group mb-2'> 
                                    <label className='form-label'>Description:
                                    </label><span></span>
                                    <input type="text" className={`form-control ${todoError.description?'is-invalid':'' }`}  placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)}></input>
                                    {todoError.description && <div className='invalid-feedback'>{todoError.description}</div>}
                                </div>
                                <br></br>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Completed:
                                    </label>
                                    <select className='form-control' value={completed} onChange={(e)=>setCompleted(e.target.value)}>
                                        
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                    </select>
                                </div>
                                <div>
                                    <button type="submit" className='btn btn-success' onClick={handelAddTodo}>Save</button>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddTodoComponent