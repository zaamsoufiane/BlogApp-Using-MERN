import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider autoHideDuration={4000} maxSnack={2}>
        <App />
       </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
