import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import vedio from '../../assets/bg.mp4';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/user/login',
        { email, password },
        { withCredentials: true }
      );
      console.log('User Login:', response.data);
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={vedio} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to darken video */}
<div className="absolute inset-0 bg-black/50"></div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="text-4xl font-bold text-center text-red-500 mb-6">Food-Insta</h1>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Not a user? <Link to="/food-partner/login" className="text-blue-500 hover:underline">Login as Food Partner</Link>
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/user/register" className="text-blue-500 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
