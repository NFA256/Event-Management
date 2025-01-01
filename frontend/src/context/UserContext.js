// src/context/UserContext.js

import React, { createContext, useState, useContext } from "react";

// Create the UserContext
const UserContext = createContext();

// Custom hook for accessing the UserContext
export const useUserContext = () => useContext(UserContext);

// Provider component to provide user info to the rest of the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    return savedUser || { isLogin: false, role: "guest" }; // Default state if no user
  });

  const login = (userData) => {
    // Check the role and save it to localStorage based on role type
    const { role, _id, name, email, cnic, exhibitorId } = userData;
    let userToSave = {
      isLogin: true,
      role:role.RoleName,
      userId: _id,
      fname: name,
      email,
      NICno: cnic,
    };

    if (role.RoleName === "exhibitor") {
      userToSave = { ...userToSave, exhibitorId };
    }

    // Save the user data with the correct structure in localStorage
    localStorage.setItem("user", JSON.stringify(userToSave));
    setUser(userToSave); // Update state

  };

  const logout = () => {
    setUser({ isLogin: false, role: "guest" });
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
