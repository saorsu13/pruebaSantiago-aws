// src/hooks/useAuth.js
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAuthenticated = token !== null;
    console.log(isAuthenticated);
    setIsAuthenticated(isAuthenticated);
  }, []);

  return { isAuthenticated, setAuth: setIsAuthenticated };
};

export default useAuth;
