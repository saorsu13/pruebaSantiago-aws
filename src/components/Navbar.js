import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavbarStyle.css'

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-toggle" onClick={() => setShowMenu(!showMenu)}>
        <i className="fas fa-bars"></i>
      </div>
      <ul className={`nav-list ${showMenu ? 'active' : ''}`}>
        <li className="nav-item">
          <Link to="/" className="nav-link">Inicio</Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">Acerca de</Link>
        </li>
        {/* Agrega más elementos del menú según sea necesario */}
      </ul>
    </nav>
  );
};

export default Navbar;