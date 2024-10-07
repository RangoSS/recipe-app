import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { clearUser } from './features/userSlice';
import bcrypt from 'bcryptjs';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // Initialize state with user data
  const [name, setName] = useState(user.name || ''); // Default to empty string if user.name is undefined
  const [surname, setSurname] = useState(user.surname || ''); // Default to empty string if user.surname is undefined
  const [cell, setCell] = useState(user.cell || ''); // Default to empty string if user.cell is undefined
  const [email, setEmail] = useState(user.email || ''); // Default to empty string if user.email is undefined
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState(user.id); // State for user ID

  // Set user data from the user object when it changes
  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setName(user.name || ''); // Ensure name is set
      setSurname(user.surname || ''); // Ensure surname is set
      setCell(user.cell || ''); // Ensure cell is set
      setEmail(user.email || ''); // Ensure email is set
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Validate password confirmation if updating the password
    if (password && password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    // Create an object with user data to update
    const updatedUser = { name, surname, cell, email }; // Start with the updated fields

    // Hash password if it's provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedUser.password = hashedPassword; // Include the hashed password if it's being updated
    }

    try {
      // Include the user ID when making the PUT request
      await axios.put(`http://localhost:3001/users/${userId}`, { ...updatedUser, id: userId });
      alert('Profile updated successfully');
      setUpdating(false);
    } catch (error) {
      console.log("User ID:", userId); // Log user ID for debugging
      console.error("Error updating profile:", error);
      setErrorMessage('Failed to update profile. Please check your input and try again.');
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {updating ? (
        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label>User ID</label>
            <input type="text" className="form-control" value={userId} readOnly />
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
            <input type="text" className="form-control" value={cell} onChange={(e) => setCell(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button type="button" className="btn btn-secondary mt-3" onClick={() => setUpdating(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p><strong>User ID:</strong> {userId}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Surname:</strong> {user.surname}</p>
          <p><strong>Cell Number:</strong> {user.cell}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="btn btn-primary" onClick={() => setUpdating(true)}>Update Profile</button>
        </div>
      )}
      <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
