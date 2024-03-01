import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import BankDetail from '../screens/BankDetail'
import AccountDetail from '../screens/AccountDetail'
import Settings from '../screens/Settings'
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';



const PrivateRoute = ({ element, ...props }) => {
  const isAuthenticated = useAuth();
  console.log(isAuthenticated);
  return isAuthenticated ? (
    <Route element={element} {...props} />
  ) : (
    <Navigate to="/" />
  );
};
const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={<PrivateRoute element={<Home />} />}
        />
        <Route
          path="/bank/:id"
          element={<PrivateRoute element={<BankDetail />} />}
        />
        <Route
          path="/account/:id"
          element={<PrivateRoute element={<AccountDetail />} />}
        />
        <Route
          path="/settings"
          element={<PrivateRoute element={<Settings />} />}
        />
      </Routes>
    </Router>
  );
};

export default Navigation;
