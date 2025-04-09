import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import AdminFormBuilder from './components/AdminFormBuilder';
import FormPage from './components/FormPage';
import AvailableForms from './components/AvailableForms';
import AdminLogin from './components/AdminLogin';
import './App.css';

function App() {
  // const navigate=useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('username'));

    return (
      
        <BrowserRouter>
          <div style={{width:"100%"}}>
            <button onClick={()=>{window.location.href='/login'}} >{isAuthenticated ? "User": "Admin Login"}</button>
          </div>
      
            <Routes>
                <Route path='/' element={<AvailableForms />} />
                <Route path='/admin' element={isAuthenticated ? <AdminFormBuilder /> : <AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
                <Route path='/login' element={ <AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
                <Route path='/form/:id' element={<FormPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;