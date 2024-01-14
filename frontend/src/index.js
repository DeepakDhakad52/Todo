import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

export const Context = createContext();

const AppProvider = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Context.Provider value={{
      isAuth,
      setIsAuth,
    }}>
      <App />
    </Context.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider />
  </React.StrictMode>
);
