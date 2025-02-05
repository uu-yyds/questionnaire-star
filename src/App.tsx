import React from 'react';
import { GlobalStyle } from './styles/Global';
import { RouterProvider } from 'react-router-dom';
import routerConfig from './routers';
import 'antd/dist/reset.css';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <RouterProvider router={routerConfig} />
    </div>
  );
}

export default App;
