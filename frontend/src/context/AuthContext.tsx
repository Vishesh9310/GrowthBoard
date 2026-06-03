import React, { createContext, useEffect, useState } from 'react'
import api from '../services/api';

type AuthContextType = {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  //check authentication on app load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await api.get("/me", { withCredentials: true });
      if (res.data && res.data.isAuthenticated) {
        setIsAuthenticated(true);
        setUser(res.data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      console.error("Auth check failed", err);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await api.post("/login", { email, password }, { withCredentials: true });
    if (res.data.success) {
      setIsAuthenticated(true);
      checkAuth(); //fetch user info;
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout", {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUser(null);
    } catch (err) {
      console.error("Logout Failed");
    }
  };

  return (
    <AuthContext.Provider value={{isAuthenticated, user, loading, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}