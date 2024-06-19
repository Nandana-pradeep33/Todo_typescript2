import React, { useState } from 'react';
import { login } from '../api/userApi';

import { Link, useNavigate, useLocation } from "react-router-dom";
const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state before attempting login

    try {
      const response = await login(username, password);
      console.log('Login successful:', response.data);

      if (response.code === 200) {
        const token = response.access_token; // Assume the token is returned in response.data.token
        localStorage.setItem('authToken', token);
        console.log('Login successful:', response);
        navigate('/Todo'); // Replace '/main' with your main page route
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setError('Login error occurred. Please try again.');
    }
  };

  return (
    <section className='mt-12 pt-10'>
    <form onSubmit={handleLogin}  className='max-w-[500px] w-full mx-auto rounded-lg bg-gray-900 p-8 py-12 px-8 mt-14'>
       <h2 className='text-2xl text-white font-bold text-center pb-5'>SignIn</h2>
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
                
                <div className='text-center mt-3'>
                <button type='submit' className="rounded-lg  p-3 mx-auto text-center text-white w-full font-semi-bold" style={{backgroundColor:'#940f80'}}>SignIn</button>
                </div>
        
      {error && <div style={{ color: 'red' }}>{error}</div>} 
      <p className='pt-7 text-center text-white  mx-auto'>Don't have an account? <Link to='/Signup'><u>Sign Up</u></Link></p>
    </form>
    </section>
  );
};

export default Login;
