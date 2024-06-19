
import img from '../assets/icons8-delete-30.png'
import img2 from '../assets/check.png'
import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import { createTodo } from '../api/userApi';
import { deleteTodo } from '../api/userApi';
import {markTodosAsCompleted} from '../api/userApi';
import { fetchTodos } from '../api/userApi';
import {logoutUser} from '../api/userApi'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useNavigate} from "react-router-dom";
type Items ={
  title:string;
  id: number;
  
}


function Todo() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);


  

const [items, setItems]= useState<Items[]>([]);
const [inputVal,setInputVal]= useState<string>('');
// Track if items have been loaded
const navigate= useNavigate();

useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      try {
        const todos = await fetchTodos(token);
        setItems(todos);
       
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchData();
  }, []);



const handleSubmit = async (event:React.FormEvent) => {
  event.preventDefault()
  if (inputVal.trim() === '') return; 
  const token = localStorage.getItem('authToken');
  
  // Get the stored token
    if (!token) {
      console.error('No authentication token found');
      return;
    }
try{
    const newTodo = await createTodo(inputVal,'2025-06-20T20:46:17.009000+05:30', token);
    
    setItems((prev) => [...prev, { title: inputVal, id: newTodo.id }]);
    setInputVal('');
}catch (error) {
    console.error('Error creating todo:', error);
  }
 
};

const handleLogout = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No authentication token found');
      return;
    }
  
    try {
      await logoutUser(token);
      navigate('/');
      // Optionally, perform any cleanup or redirect to a login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  


  



const handleDelete = async (id: number) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('No authentication token found');
      return;
    }

    try {
      await deleteTodo(id, token); // Call the deleteTodo API function
      setItems((prev) => prev.filter((data) => data.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleMarkAsCompleted = async (id: number) => {
    const token = localStorage.getItem('authToken');
    console.log(token);
    if (!token) {
      console.error('No authentication token found');
      return;
    }
  
    try {
      await markTodosAsCompleted([id], token);
      toast.success('Marked as complete');
      //ionally, update your state or perform any other actions after marking the todo as completed
    } catch (error) {
      console.error('Error marking todo as completed:', error);
      toast.error('Failed to mark as complete');
    }
  };
  
  const handleViewCompletedTodos = () => {
    navigate('/completed');
  };




  return (
    <>
      <div className="text-center align-items-center mx-auto h-[750px]" style={{ background: 'linear-gradient(30deg, #a11a7a,#2a0936)', height:'100vh' }}> 
        
        <div className='bg-gray-900 h-[60px] flex items-center '>
        <button onClick={()=>handleViewCompletedTodos()} className="rounded-lg ml-3 p-3  text-white w-[190px] mr-4 font-semi-bold" style={{backgroundColor:'#940f80',marginLeft: 'auto'}} >View Completed Todos</button>
            <button onClick={()=>handleLogout()} className="rounded-lg  p-3  text-white w-[80px] mr-5 font-semi-bold" style={{backgroundColor:'#940f80'}}>Logout</button>
        </div>
        <p className=' text-white text-3xl text-center p-5 pt-12 mt-15 font-bold'>Todo List</p>
        <div className="mb-16">
          <form  onSubmit={handleSubmit}>
            <input className="md:w-[550px] w-[240px] mt-7 border-black rounded-lg p-3 mb-5 ml-10" 
             type="text" placeholder=' Enter Todo .. ' value={inputVal} onChange={(event)=> setInputVal(event.target.value)} ref={inputRef}>

             </input>
            <button type='submit' className="rounded-lg ml-3 p-3  text-white w-[70px] font-semi-bold" style={{backgroundColor:'#940f80'}}>Add</button>
           
          </form>
         
        </div>
        <div>
          {items.map(data=>(
            <div  key={data.id} className="border border-white mx-auto rounded lg:w-[540px] w-[280px]  md:p-2 p-1  mb-7 text-white "><div className="flex justify-between items-center">
            <p className="mr-2 p-2" style={{fontSize:'19px'}}>{data.title}</p>
            <div className="flex items-center">
            <button onClick={() => handleDelete(data.id)}><img src={img} alt="icon" className="w-7 h-6" /></button>
            <button className='pl-7' onClick={() => handleMarkAsCompleted(data.id)}><img src={img2} alt="icon" className="w-5 h-6" /></button>
            <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        </div>
          </div>
          
          </div>
          

          ))}
        
        </div>
        
        </div>
    </>
  )
}

export default Todo;
