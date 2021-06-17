import React, { createContext, ReactNode, useState } from 'react';
import { api } from '../services/api';

interface User {
  _id: string;
  email: string;
  token: string;
}

interface SignInData {
  email: string;
}

export interface AuthContextData {
  user: User;
  signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  // const [isAuthenticate, setIsAuthenticate] = useState(false);

  async function signIn({ email }: SignInData) {
    const response = await api.get(`start/${email}`);

    setUser(response.data);

    const { token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    // setIsAuthenticate(true);
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
