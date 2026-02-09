import { http } from "@/utility/HTTPUtility";
import { createContext, useContext, useState, type ReactNode } from "react";

/**
 * User data exposed to frontend
 */
interface User {
  id: string;
  email: string;
  name: string;
}

/**
 * Context contract
 */
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  /**
   * Called AFTER successful login API
   * Cookie is already set by backend
   */
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  /**
   * Logout must hit backend to clear cookie
   */
  const logout = async () => {
    try {
      await http.post("/auth/logout", {}, { withCredentials: true });
      logout();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
