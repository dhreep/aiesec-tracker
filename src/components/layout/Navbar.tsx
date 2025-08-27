import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>Lead Dashboard</h2>
        </div>
        
        <div className="nav-tabs">
          <Link 
            to="/" 
            className={`nav-tab ${isActive('/') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/upload" 
            className={`nav-tab ${isActive('/upload') ? 'active' : ''}`}
          >
            Upload
          </Link>
          <Link 
            to="/metrics" 
            className={`nav-tab ${isActive('/metrics') ? 'active' : ''}`}
          >
            Analytics
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
