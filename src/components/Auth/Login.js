import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
//import { setUser } from './../features/authSlice'; // Adjust path to your auth slice
import { setUser } from './../features/userSlice';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/users?email=${email}`);
      
      if (response.data.length > 0) {
        const user = response.data[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        
        if (isPasswordValid) {
          // Assuming you also have a way to get the token
          const token = user.token; // Adjust this based on your user object structure
          
          // Dispatch the action to set user and token
          dispatch(setUser({ user: { id: user.id, name: user.name, email: user.email }, token }));
          
          // Optionally redirect the user or show a success message
        } else {
          alert('Invalid credentials');
        }
      } else {
        alert('User not found');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="container mt-5">
      <h2>Login</h2>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;
