import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      const userProfile = user.profile || [];
      localStorage.setItem("MBO-PROFILE-DASHBOARD", JSON.stringify(userProfile));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};