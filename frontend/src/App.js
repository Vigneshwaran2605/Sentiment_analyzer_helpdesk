import React from 'react';
import EmployeeDashboard from './Page/EmployeeDashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './components/Auth';
import Login from './Page/Login';

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route index element={<EmployeeDashboard/>} />
        </Routes>
        <Routes>
            <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
