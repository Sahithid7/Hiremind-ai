import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { fetchCurrentUser, loginUser, registerUser } from "../services/authService";

const AuthContext = createContext(null);

function readStoredUser() {
  const rawUser = localStorage.getItem("hiremind_user");
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    localStorage.removeItem("hiremind_user");
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("hiremind_token"));
  const [user, setUser] = useState(readStoredUser);
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(token));

  useEffect(() => {
    let ignore = false;

    async function hydrateUser() {
      if (!token) {
        setIsBootstrapping(false);
        return;
      }

      try {
        const currentUser = await fetchCurrentUser();
        if (!ignore) {
          setUser(currentUser);
          localStorage.setItem("hiremind_user", JSON.stringify(currentUser));
        }
      } catch {
        if (!ignore) {
          setToken(null);
          setUser(null);
          localStorage.removeItem("hiremind_token");
          localStorage.removeItem("hiremind_user");
        }
      } finally {
        if (!ignore) setIsBootstrapping(false);
      }
    }

    hydrateUser();
    return () => {
      ignore = true;
    };
  }, [token]);

  async function login(credentials) {
    const response = await loginUser(credentials);
    localStorage.setItem("hiremind_token", response.access_token);
    localStorage.setItem("hiremind_user", JSON.stringify(response.user));
    setToken(response.access_token);
    setUser(response.user);
    return response.user;
  }

  async function signup(payload) {
    const response = await registerUser(payload);
    localStorage.setItem("hiremind_token", response.access_token);
    localStorage.setItem("hiremind_user", JSON.stringify(response.user));
    setToken(response.access_token);
    setUser(response.user);
    return response.user;
  }

  function logout() {
    localStorage.removeItem("hiremind_token");
    localStorage.removeItem("hiremind_user");
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      isBootstrapping,
      login,
      logout,
      signup,
      token,
      user
    }),
    [isBootstrapping, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
