import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from '../../config.js';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      inputs
    );
    const token = response.data.token;
    localStorage.setItem("token", token); // Almacena el token en el localStorage
    setCurrentUser(response.data);
    return response;
  };

  const logout = async () => {
    await axios.post(`${API_BASE_URL}/api/auth/logout`);
    localStorage.removeItem("token"); // Elimina el token del localStorage
    setCurrentUser(null);
  };
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
