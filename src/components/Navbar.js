import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from './features/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Shopping List</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {user && <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>}
          {user ? (
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
            </>
          )}
        </ul>
        {user && <span className="navbar-text">Hello, {user.name}</span>}
      </div>
    </nav>
  );
};

export default Navbar;
