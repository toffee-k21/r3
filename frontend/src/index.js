import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './utils/UserContext';
import { SocketProvider } from './utils/SocketContext';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={appStore}>
  <UserProvider>
    <SocketProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </SocketProvider>
  </UserProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
