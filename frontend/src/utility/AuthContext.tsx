import { createContext, useContext, useState, type ReactNode } from "react";

// Define the type for user data
interface User {
  id: string;
  email: string;
  name: string;
  // Add any additional properties you need
}

// Create an interface for the context value
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null); // Initial state is null (logged out)

  // login function
  const login = (userData: User) => setUser(userData);

  // logout function
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
