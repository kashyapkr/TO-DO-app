import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";


export const saveRegister =(registerDto)=>axios.post(BASE_URL+'/register',registerDto);

export const loginUser = (usernameOrEmail,password)=>axios.post(BASE_URL+'/login',{usernameOrEmail,password});

export const storeToken = (token)=>localStorage.setItem("token",token); //storing token in local memory as a key value pair

export const getToken = ()=>localStorage.getItem("token"); // getting token from local storage

export const saveLoginUser = (username,role)=> {
    sessionStorage.setItem("authenticatedUser",username);
    sessionStorage.setItem("role",role);

}; //session storage will expire when the window is closed

export const isLoggedIn = ()=>{  //checking if user exists
    const username = sessionStorage.getItem("authenticatedUser");
    if(username===null){
        return false;
    }else{
        return true;
    }
}

export const getLoggedInUser = ()=>{  //retrieveing the user 
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
}

export const logout=()=>{
    localStorage.clear();
    sessionStorage.clear();
}

export const isAdminUser=()=>{
    let role = sessionStorage.getItem("role");
    if(role !== null && role==="ROLE_ADMIN"){
        return true;
    }else{
        return false;
    }
}