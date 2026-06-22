import axios from 'axios';
import React, { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';


const UserRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   const Navigate = useNavigate();
   
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post('http://localhost:3000/api/auth/user/register',
      { name, email, password },
      { withCredentials: true })
      .then((response) => {
        console.log('User Registration:', response.data);
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
    setName('');
    setEmail('');
    setPassword('');
    Navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className=" w-full max-w-md items-center bg-white shadow-md p-8 rounded">   
          <h1 className="text-4xl font-bold text-center text-red-500 mb-6">Food-Insta</h1>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
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
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account? <Link to="/user/login" className="text-blue-500 hover:underline">Login here</Link>
          </p>
          <p className="mt-2 text-center text-sm text-gray-600">
            Not a User? <Link to="/food-partner/register" className="text-blue-500 hover:underline">Register as Food Partner</Link>
          </p>
        </div>
      </div>
  );
};

export default UserRegister;