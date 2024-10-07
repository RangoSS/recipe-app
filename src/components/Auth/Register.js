import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [cellNumber, setCellNumber] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
      name,
      surname,
      cellNumber,
    };

    await axios.post('http://localhost:3001/users', newUser);
    alert('User registered successfully');
  };

  return (
    <form onSubmit={handleRegister} className="container mt-5">
      <h2>Register</h2>
      <div className="form-group">
        <label>Email</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Surname</label>
        <input type="text" className="form-control" value={surname} onChange={(e) => setSurname(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Cell Number</label>
        <input type="text" className="form-control" value={cellNumber} onChange={(e) => setCellNumber(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
};

export default Registration;
