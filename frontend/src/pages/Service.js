import React, { useState, useContext } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { register } from '../services/register';  // Assuming register API exists
import Navbar from '../Components/Navbar';
// import { AuthContext } from '../contexts/AuthContext';
import '../Styles/Service.css';
const Service = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
//   const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    console.log("registering",username,email);

    e.preventDefault();
    setLoading(true);
    try {
      const data = await register(username , email, password, role);
      localStorage.setItem('email', email);
      localStorage.setItem('token', data.token);
      if(data.message==='User already exists'){
        alert("User Exist");
      }else{
        setTimeout(alert("Registration successfully"),2000);
        navigate('/');
      }
    //   setUser(data.username);  // Assuming `data.username` is returned from API
    } catch (err) {
      console.log(err);
      setError('Registration failed');  // You could show more specific error messages
    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen items-center bg-gray-10">
        <Navbar/>
        <div className="service-container">
            <h2 className='heading'>Get Fertilizer Recomendation</h2>
            <Link to='/soilform' className='link' >
                Enter Soil Detail
            </Link>
        </div>
    </div>
  );
};

export default Service;
