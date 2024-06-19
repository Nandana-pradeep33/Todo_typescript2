import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCompletedTodos } from '../api/userApi';



type Items ={
    title:string;
    id: number;
    
  }

const CompletedTodos: React.FC = () => {
  const [completedTodos, setCompletedTodos] = useState<Items[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      try {
        const todos = await fetchCompletedTodos(token);
        setCompletedTodos(todos);
      } catch (error) {
        console.error('Error fetching completed todos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-center align-items-center mx-auto h-[750px]" style={{ background: 'linear-gradient(30deg, #a11a7a,#2a0936)', height:'100vh' }}>
      <div className='bg-gray-900 h-[60px] flex items-center '>
        <button onClick={() => navigate('/Todo')} className="rounded-lg ml-3 mr-3 p-3 text-white w-[120px] font-semi-bold" style={{ backgroundColor:'#940f80', marginLeft: 'auto' }}>
          Back
        </button>
      </div>
      <p className='text-white text-3xl text-center p-5 pt-12 mt-15 font-bold'>Completed Todos</p>
      <div>
        {completedTodos.map(todo => (
          <div key={todo.id} className="border border-white mx-auto rounded lg:w-[540px] w-[280px] md:p-2 p-1 mb-7 text-white">
            <p className="mr-2 p-2" style={{ fontSize: '19px' }}>{todo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedTodos;
