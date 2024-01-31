import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import ListTodoComponent from './TodoComponent/ListTodoComponent'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import AddTodoComponent from './TodoComponent/AddTodoComponent'
import RegisterComponent from './RegisterComponnt/RegisterComponent'
import LoginComponent from './RegisterComponnt/LoginComponent'
import { isLoggedIn } from './services/RegisterService'


function App() {

  function AuthenticatedRoute({children}){
    let isAuth = isLoggedIn();
    if(isAuth){
      return children;
    }
    else{
      return <Navigate to='/'></Navigate>
    }
  }



  

  return (
    <>
    
    <BrowserRouter>    
    <HeaderComponent/>
      <Routes>
        <Route path='/' element={<LoginComponent/>}></Route>
        <Route path='/add' element={
          <AuthenticatedRoute>
            <AddTodoComponent/>
          </AuthenticatedRoute>
        }></Route>
        <Route path='/todo' element={<AuthenticatedRoute><ListTodoComponent/></AuthenticatedRoute>}></Route>
        <Route path='/update/:id' element={<AuthenticatedRoute><AddTodoComponent/></AuthenticatedRoute> }></Route>
        <Route path='/register' element={<RegisterComponent/>}></Route>
       
      </Routes>
    </BrowserRouter>
    <FooterComponent/>
      
      

      
    </>
  )
}

export default App
