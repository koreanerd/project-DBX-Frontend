import React, { useState, createContext, useMemo } from "react";
import PropTypes from "prop-types";

export const InitialResponseContext = createContext();

export function InitialResponseProvider({ children }) {
  const [initialResponse, setInitialResponse] = useState(null);
  const value = useMemo(
    () => ({ initialResponse, setInitialResponse }),
    [initialResponse]
  );

  return (
    <InitialResponseContext.Provider value={value}>
      {children}
    </InitialResponseContext.Provider>
  );
}

InitialResponseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
