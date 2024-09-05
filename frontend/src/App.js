import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import MainHeader from './components/MainHeader';
import SoilDataForm from './components/solidDataForm';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './pages/Dshboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import SoilAnalysis from './pages/SoilAnalysis';
import Home from './pages/Home';
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
        <div className="flex flex-col min-h-screen"> 
    <AuthProvider>
    <Router>
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path='/' element={<MainHeader />}/>
              <Route index  element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <>
                    <Dashboard />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <Profile />
                  </>
                }
              />
              <Route
                path="/soil-data"
                element={
                  <>
                    <SoilDataForm />
                  </>
                }
              />
              <Route
                path="/analyze/:id"
                element={
                  <>
                    <SoilAnalysis />
                  </>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
          <Footer />
      </Router>
      </AuthProvider>
     </div> 
  );
}

export default App;