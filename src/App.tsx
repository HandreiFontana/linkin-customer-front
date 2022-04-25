import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from "./components/header"

import GlobalStyle from './styles/global';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
