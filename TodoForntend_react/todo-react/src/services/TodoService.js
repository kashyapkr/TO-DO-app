import axios from "axios";
import { getToken } from "./RegisterService";

const REST_API_BASE_URL = "http://localhost:8080/api/todo";


axios.interceptors.request.use(function (config) {
    // Do something before request is sent

    config.headers['Authorization'] = getToken();
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });



export const getListOfTodos = ()=> axios.get(REST_API_BASE_URL);

export const addTodo = (todo)=>axios.post(REST_API_BASE_URL,todo);

export const deleteTodo = (id)=>axios.delete(REST_API_BASE_URL+'/'+id);

export const getTodo = (id)=>axios.get(REST_API_BASE_URL+'/'+id);

export const updateTodo = (id,todo)=> axios.put(REST_API_BASE_URL+'/'+id,todo);

export const setCompletedTodo = (id)=>axios.patch(REST_API_BASE_URL+'/'+id+'/complete');

export const setInCompleted  = (id)=>axios.patch(REST_API_BASE_URL+'/'+id+'/incomplete');