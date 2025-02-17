import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [permissions, setPermissions] = useState(() => {
    const savedPermissions = localStorage.getItem("mkani-permissions");
    return savedPermissions ? JSON.parse(savedPermissions) : [];
  });

  useEffect(() => {
    if (user) {
      const userPermissions = user.permissions || [];
      setPermissions(userPermissions);
      localStorage.setItem("mkani-permissions", JSON.stringify(userPermissions));
    }
  }, [user]);

  return (
    <PermissionsContext.Provider value={permissions}>
      {children}
    </PermissionsContext.Provider>
  );
};