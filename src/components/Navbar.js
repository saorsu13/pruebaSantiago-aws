import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavbarStyle.css'

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
      setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <div className="navbar-toggle" onClick={toggleMenu}>
        <i className="fa fa-bars"></i>
      </div>
      <ul className={`nav-list ${showMenu ? 'active' : ''}`}>
        <li className="nav-item">
          <Link to="/home" className="nav-link">Bancos</Link>
        </li>
        <li className="nav-item">
          <Link to="/accounts" className="nav-link">Cuentas</Link>
        </li>
        <li className="nav-item">
          <Link to="/transactions" className="nav-link">Transacciones</Link>
        </li>
        <li className="nav-item">
          <Link to="/settings" className="nav-link">Configuración</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;