import { createContext, useState } from "react";

const ErrorDetailsContext = createContext({});


export const ErrorDetailsProvider = ({ children }) => {

  const [errorOccurred, setErrorOccurred] = useState(false);
  const [error, setError] = useState(' ');

  return (
    <ErrorDetailsContext.Provider value={{
      errorOccurred, error, setErrorOccurred, setError
    }}>
        { children }
    </ErrorDetailsContext.Provider>
  )
}

export default ErrorDetailsContext 