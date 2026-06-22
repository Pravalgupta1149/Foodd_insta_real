import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';



const FoodPartnerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post(
      'http://localhost:3000/api/auth/foodpartner/login',
      { email, password },
      { withCredentials: true }
    );

    console.log('Food Partner Login:', response.data);

    // If backend returns a token, store it
    // localStorage.setItem('token', response.data.token);

    if (response.status === 200) {
    
    setEmail('');
    setPassword('');

    // Use navigate hook for redirect
    Navigate('/create/food');
    }
  } catch (error) {
    console.error('Error logging in food partner:', error);
  }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className=" items-center w-full max-w-md bg-white shadow-md p-8 rounded">
          <h1 className="text-4xl font-bold text-center text-red-500 mb-6">Food-Insta</h1>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Food Partner Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don&apos;t have an account? <Link to="/food-partner/register" className="text-blue-500 hover:underline">Register here</Link>
          </p>
          <p className="mt-2 text-center text-sm text-gray-600">
            Not a Food Partner? <Link to="/user/login" className="text-blue-500 hover:underline">Login as User</Link>
          </p>
        </div>
      </div>
  );
};

export default FoodPartnerLogin;