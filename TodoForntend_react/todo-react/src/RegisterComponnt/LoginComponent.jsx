import React, { useState } from 'react'
import {saveLoginUser, storeToken } from '../services/RegisterService';
import { loginUser } from '../services/RegisterService';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {

    const[usernameOrEmail,setUsernameOrEmail] = useState('');
    const[password,setPassword] = useState('');

    const[errormsg,setErrormsg] = useState('');

    const navigator = useNavigate();

     const handelSubmit= (e)=>{
        e.preventDefault();
       
        
        loginUser(usernameOrEmail,password).then((response)=>{
            console.log(response.data);
            // const token = 'Basic '+ window.btoa(usernameOrEmail + ":" + password); //This is called a basic auth token which we have to pass in the header of apis.

            const token = 'Bearer '+ response.data.accessToken;
            const role = response.data.role;

            storeToken(token);
            setErrormsg('');

            saveLoginUser(usernameOrEmail,role);
            console.log(role);
            navigator('/todo');
            window.location.reload(false); //false:=> reload page from the server not cache
           
        }).catch((error)=>{
          setErrormsg('Invalid username or password');
          console.log(error);

        });


    }

  return (
    <div className='container'>
      <br></br>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='card'>
            <div className='card-header'>
              <h2 className='text-center'>User Login</h2>
            </div>
            <div className='card-body'>
              <form>
                <div className='row mb-3'>
                  <label className='col-md-3 control-label'>Username or Email</label>
                  <div className='col-md-9'>
                  <input className={`form-control ${errormsg ? 'is-invalid' :''}`}
                    type='text'
                    value={usernameOrEmail}
                    placeholder='Enter username or email'
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                  ></input>
                </div>
                </div>
                <div className='row mb-3'>
                  <label className='col-md-3 control-label'>Password</label>
                  <div className='col-md-9'>
                  <input className={`form-control ${errormsg ? 'is-invalid' :''}`}
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
                {errormsg && (
                  <div className='row mb-3'>
                    <div className='col-md-9 offset-md-3 text-danger'>
                      {errormsg}
                    </div>
                  </div>
                )}
                


              </form>
            </div>

          </div>


        </div>

      </div>


    </div>
  )
}

export default LoginComponent