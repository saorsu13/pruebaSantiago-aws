import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import BankDetail from '../screens/BankDetail'
import AccountDetail from '../screens/AccountDetail'
import Settings from '../screens/Settings'

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bank/:id" element={<BankDetail />} />
        <Route path="/account/:id" element={<AccountDetail />} />
        <Route path="/settings" element={<Settings />} /> 
      </Routes>
    </Router>
  );
};

export default Navigation;
