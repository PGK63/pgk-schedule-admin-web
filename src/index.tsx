import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";

import 'macro-css';
import Store from './store/store';

const store = new Store();

export const Context = React.createContext({
  store,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <Router>
    <Context.Provider value = {{store}}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Context.Provider>
  </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
