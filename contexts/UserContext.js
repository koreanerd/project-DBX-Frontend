import React from "react";

const UserContext = React.createContext({
  userData: null,
  userEmail: null,
  isAdmin: false,
  handleGoogleLogin: () => {},
});

export default UserContext;
