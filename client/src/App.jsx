import './App.css'
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage';
import axios from "axios"
import DeluxeRoom from './rooms/DeluxeRoom';
import StandardRoom from './rooms/StandardRoom';
import SuiteRoom from './rooms/SuiteRoom';
import PaymentPage from './pages/PaymentPage';
import AccountPage from './pages/AccountPage.jsx';
import Services from "./pages/Services.jsx";
import FindReservation from "./pages/FindReservation.jsx";
import Confirmation from "./pages/Confirmation.jsx";
import Header from './Header.jsx';
import Footer from './Footer.jsx';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
      
        <Route path="/" element={<Layout />} />
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/DeluxeRoom" element={<DeluxeRoom />} />
        <Route path="/StandardRoom" element={<StandardRoom />} />
        <Route path="/SuiteRoom" element ={<SuiteRoom />} />
        <Route path="/Payment" element ={<PaymentPage />} />
        <Route path="/account" element ={<AccountPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/amenities" element={<Services />} />
        <Route path="/reservations" element={<FindReservation />} />
        <Route path="/confirmation" element={<Confirmation />} />
      
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
