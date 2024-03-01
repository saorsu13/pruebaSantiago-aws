// src/hooks/useAuth.js
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAuthenticated = token !== null;
    setIsAuthenticated(isAuthenticated);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAuthenticated = token !== null;
    setIsAuthenticated(isAuthenticated);
  }, [localStorage.getItem('token')]);

  return isAuthenticated;
};

export default useAuth;
