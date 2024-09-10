import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/register';  // Assuming register API exists
import Navbar from '../Components/Navbar';
// import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
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
    console.log(username,email,password,role);
    
    try {
        console.log(username,email,password,role);
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
    <div className="min-h-screen items-center bg-gray-100">
        <Navbar/>
      <h2 className="text-2xl text-center font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-[500px] m-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">Username</label>
          <input  
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block mb-2">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="farmer">Farmer</option>
            <option value="expert">Expert</option>
          </select>
        </div>
        <button
          type="submit"
          className={`bg-blue-600 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
