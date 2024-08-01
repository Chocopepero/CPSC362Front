import './App.css';
import { Routes, Route } from 'react-router-dom';
import About from './About.jsx';
import RegisterPage from './pages/RegisterPage';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage';
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
import { AuthProvider } from './assets/components/AuthContext'; 
import SendEmail from './pages/SendEmail.jsx';
import AdminPage from './pages/AdminPage.jsx';
import ProtectedRoute from './assets/components/ProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="bg-gradient-to-t from-[#afd3e2] to-[#ffa6a6] flex flex-col min-h-screen">
        <div className="bg-lightcyan min-h-[50px]">
          <Header/>
        </div>
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/DeluxeRoom" element={<DeluxeRoom />} />
            <Route path="/StandardRoom" element={<StandardRoom />} />
            <Route path="/SuiteRoom" element ={<SuiteRoom />} />
            <Route path="/Payment" element ={<PaymentPage />} />
            <Route path="/account" element ={<AccountPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/amenities" element={<Services />} />
            <Route path="/reservations" element={<FindReservation />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/sendEmail" element={<SendEmail />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
        <div className="bg-papayawhip min-h-[50px]">
          <Footer/>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
