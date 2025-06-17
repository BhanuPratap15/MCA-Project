import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    // Demo authentication
    if (email === 'admin@demo.com' && password === 'admin123') {
      setUser({
        id: '1',
        name: 'Admin User',
        email: 'admin@demo.com',
        isAdmin: true
      });
      return true;
    } else if (email === 'user@demo.com' && password === 'password123') {
      setUser({
        id: '2',
        name: 'John Doe',
        email: 'user@demo.com',
        isAdmin: false
      });
      return true;
    }
    
    // Allow any email/password for demo
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email: email,
      isAdmin: false
    });
    return true;
  };

  const register = (name: string, email: string, password: string): boolean => {
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      isAdmin: false
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};