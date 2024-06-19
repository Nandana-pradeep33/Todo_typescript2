// src/pages/Signup.tsx
import React, { useState } from 'react';
import { signup } from '../api/userApi'
import { Link, useNavigate, useLocation } from "react-router-dom";



const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const navigate = useNavigate();
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signup(username, password, firstName, lastName);
      console.log('Signup successful:', response.data);
     navigate('/');
      // Handle successful signup (e.g., redirect to login or main page)
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <section className='mt-5 pt-10'>

    <form onSubmit={handleSignup} className='max-w-[500px] w-full mx-auto rounded-lg bg-gray-900 p-8 py-12 px-8'>
                <h2 className='text-2xl text-white font-bold text-center pb-5'>SignUp</h2>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label >Username:</label>
                    <input className='border bg-gray-700 border-black rounded-lg  mt-2 p-2 focus:border-blue-500  ' 
                    type="text" value={username} onChange={(e) => setUsername(e.target.value)}  required
                    />
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Password:</label>
                    <input className='border bg-gray-700 border-black rounded-lg  mt-2 p-2 focus:border-blue-500'  type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                     required
                   />
                  
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label >FirstName:</label>
                  <input className='border  bg-gray-700 border-black rounded-lg  mt-2 p-2 focus:border-blue-500' 
                  type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}  required 
                  />
                    
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>LastName:</label>
                    <input className='border bg-gray-700 border-black rounded-lg  mt-2 p-2 focus:border-blue-500'
                    type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}  required
                    />
                     
                </div>
                <div className='text-center mt-3'>
                <button type='submit' className="rounded-lg  p-3 mx-auto text-center text-white w-full font-semi-bold" style={{backgroundColor:'#940f80'}}>SignUp</button>
                </div>
                
                
            </form> 
  </section>
   /* <div>
      <h2>Signup</h2>
      <div className='mx-auto my-auto lg:w-1/2'>
      <form onSubmit={handleSignup}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
        <button type="submit">Signup</button>
      </form>
      </div>
    </div> */
  );
};

export default Signup;
