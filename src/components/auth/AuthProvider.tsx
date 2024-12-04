import React, { createContext, useContext, useEffect } from 'react';
import { useAuth } from '@/lib/hooks';
import Login from './Login';

const AuthContext = createContext<{ isAuthenticated: boolean }>({ isAuthenticated: false });

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    setIsLoading(false);
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: true }}>
      {children}
    </AuthContext.Provider>
  );
}