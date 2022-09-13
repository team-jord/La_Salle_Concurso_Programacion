import { useState } from "react";
import { createContext } from "react";
import SecureLS from "secure-ls";

const ls = new SecureLS({ encodingType: "aes" });

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    correo: "logralahad@gmail.com",
    password: "ola",
  });

  const login = async (user, token) => {
    ls.set("token", token);
    ls.set("currentUser", JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = async () => {
    setCurrentUser(undefined);
    ls.removeAll();
  };

  const checkUser = async () => {
    const currentUser = ls.get("currentUser");
    if (currentUser) setCurrentUser(JSON.parse(currentUser));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        checkUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
