import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from './services/RegisterService';




const HeaderComponent = () => {
    const navigator = useNavigate();



   let isAuth = isLoggedIn();

   function handelLogout(){
    // e.preventDefault();
    logout();
    navigator('/');
    
   }





    return (

        <div>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className='collapse navbar-collapse'>
                        <ul className='navbar-nav'>                         
                                {
                                    isAuth &&  <li className='nav-item'>
                                        <NavLink to='/todo' className='nav-link'><h4>Todos</h4></NavLink> </li>
                                }
      
                        </ul>

                    </div>
                    <ul className='navbar-nav'>
                        
                            {
                                !isAuth &&<li className='nav-item'> 
                                <NavLink to='/register' className='nav-link'>Register</NavLink></li>
                            }
                            
                        

                    </ul>
                    <ul className='navbar-nav'>
                            {
                                 !isAuth && <li className='nav-item'> 
                                 <NavLink to='/' className='nav-link'>Login</NavLink> 
                                 </li>
                            }
                    </ul>
                    <ul className='navbar-nav'>
                            {
                                 isAuth && <li className='nav-item'> 
                                 <NavLink to='/' onClick={handelLogout} className='nav-link'>Logout</NavLink> 
                                 </li>
                            }
                    </ul>

                </nav>

            </header>

        </div>
    );
};

export default HeaderComponent;
