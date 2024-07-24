import './App.css'
import { Routes, Route } from 'react-router-dom';

import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import axios from "axios"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/pages" element={<LoginPage />} />
        <Route path="/pages" element={<RegisterPage />} />
        <Route path="/pages" element={<AccountPage />} />
      </Route>
    </Routes>
    
  );
}

export default App;
