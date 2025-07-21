import { createContext, useState } from "react";

export const ApiContext = createContext(null);

export const ApiProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState(null);

  return (
    <ApiContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiContext.Provider>
  );
};
