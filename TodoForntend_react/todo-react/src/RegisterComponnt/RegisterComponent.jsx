import React, { useState } from 'react'
import { saveRegister } from '../services/RegisterService';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigator = useNavigate();

  const handelSubmit = (e)=>{
    e.preventDefault(); //prevent default behaviour of form 
    
    const register = {name,username,email,password};
    saveRegister(register).then((response)=>{
      console.log(response.data);
      navigator('/');

      
      
      
    }).catch(error=>{console.log(error);
      alert("fill the details")
    });


  }



  return (
    <div className='container'>
      <br></br>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='card'>
            <div className='card-header'>
              <h2 className='text-center'>User Registration</h2>
            </div>
            <div className='card-body'>
              <form>
                <div className='row mb-3'>
                  <label className='col-md-3 control-label'>Name</label>
                  <div className='col-md-9'>
                  <input className='form-control'
                    type='text'
                    value={name}
                    placeholder='Enter name'
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                </div>
                <div className='row mb-3'>
                  <label className='col-md-3 control-label'>User Name</label>
                  <div className='col-md-9'>
                  <input className='form-control'
                    type='text'
                    value={username}
                    placeholder='Enter Usename'
                    onChange={(e) =>setUsername(e.target.value)}
                  ></input>
                </div>
                </div>
                <div className='row mb-3'>
                  <label className='col-md-3 control-label'>Email</label>
                  <div className='col-md-9'>
                  <input className='form-control'
                    type='email'
                    value={email}
                    placeholder='Enter email'
                    onChange={(e) =>setEmail(e.target.value)}
                  ></input>
                </div>
                </div>
                <div className='row mb-3'>
                  <label className='col-md-3 control-label'>Password</label>
                  <div className='col-md-9'>
                  <input className='form-control'
                    type='password'
                    value={password}
                    placeholder='Enter password'
                    onChange={(e) =>setPassword(e.target.value)}
                  ></input>
                </div>
                </div>
                <div className='col mb-3'>
                  <button className='btn btn-primary' onClick={(e)=>handelSubmit(e)}>Submit</button>
 
                </div>
                


              </form>
            </div>

          </div>


        </div>

      </div>


    </div>
  )
}

export default RegisterComponent