// src/api/userApi.ts
import axios from 'axios';



const baseURL = 'https://jelan.pythonanywhere.com/'; // Replace with your actual base URL

export const signup = (username:string, password:string, firstName:string, lastName:string) => {
  const signupEndpoint = `${baseURL}/api/user/signup`;

  const signupData = new FormData();
  signupData.append('username', username);
  signupData.append('password', password);
  signupData.append('first_name', firstName);
  signupData.append('last_name', lastName);

  return axios.post(signupEndpoint, signupData);
};

export const login = async (username: string, password: string) => {
  const loginEndpoint = `${baseURL}/api/user/login`;

  const loginData = new FormData();
  loginData.append('username', username);
  loginData.append('password', password);

  const response = await axios.post(loginEndpoint, loginData);
  return response.data; 
};

export const createTodo = async (title: string, expiry: string, token: string) => {
  const createTodoEndpoint = `${baseURL}/api/todo/`;
  const formData = new FormData();
  formData.append('title', title);
  formData.append('expiry', expiry);
  try {
    const response = await axios.post(createTodoEndpoint, formData, {
      headers: {
        Authorization: token
      },
    });
    console.log('Todo created:', response.data);
    return response.data;
   
     // Returning the data directly
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const deleteTodo = async (id: number, token: string) => {
  const deleteTodoEndpoint = `${baseURL}/api/todo/${id}`;
  try {
    const response = await axios.delete(deleteTodoEndpoint, {
      headers: {
        Authorization: token
      },
    });
    console.log('Todo deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

export const markTodosAsCompleted = async (ids: number[], token: string) => {
  const markTodosEndpoint = `${baseURL}/api/todo/markall`;
  try {
    const response = await axios.post(markTodosEndpoint, {
      ids: ids,
    }, {
      headers: {
        'Authorization': token,
        
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error marking todos as completed:', error);
    throw error;
  }
};


export const fetchTodos = async (token: string) => {
  const fetchTodosEndpoint = `${baseURL}/api/todo/`; // Ensure this URL matches your backend route
  try {
    const response = await axios.get(fetchTodosEndpoint, {
      headers: {
        Authorization: token,
      },
    });
    console.log('Fetched todos:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching todos:', error.response ? error.response.data : error.message);
    } else {
      console.error('Error fetching todos:', error);
    }
    throw error;
  }
};


export const logoutUser = async (token: string) => {
  const logoutEndpoint = `https://jelan.pythonanywhere.com/api/user/logout`;
  try {
    const response = await axios.post(logoutEndpoint, null, {
      headers: {
        Authorization: token,
      },
    });
    console.log('User logged out:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};


export const fetchCompletedTodos = async (token: string) => {
  const fetchCompletedTodosEndpoint = `${baseURL}/api/todo?flag=completed`;
  const response = await axios.get(fetchCompletedTodosEndpoint, {
    headers: {
      Authorization: token,
    },
  });
  console.log(response.data);
  return response.data;
};
