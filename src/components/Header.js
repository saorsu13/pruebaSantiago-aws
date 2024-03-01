import React from 'react';
import '../styles/HeaderStyle.css';
import Navbar from './Navbar';

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <img src="/iconoblanco.png" alt="Logo del Banco" className="logo" />
                    <h1 className="nombre-banco">FinanziaBank</h1>
            </div>
            <div className="header-right">
                <Navbar />
            </div>
        </header>
    );
};

export default Header;