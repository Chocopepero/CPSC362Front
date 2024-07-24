import './App.css'
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage';

import axios from "axios"


function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Layout />} />
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        
      
    </Routes>
    
  );
}

export default App;
