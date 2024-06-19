
// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './Components/Signup';
import Login from './Components/Login';
import Todo from './Components/Todo';
import CompletedTodos from './Components/CompletedTodos';

const App: React.FC = () => {

  return (
   
      <Router basename="/Todo_typescript2">
      <Routes>
        <Route path="/"  element={<Login/>} />
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/todo' element={<Todo/>} />
        <Route path='/completed' element={<CompletedTodos/>}/>
      </Routes>
    </Router>
  );
};

export default App;
