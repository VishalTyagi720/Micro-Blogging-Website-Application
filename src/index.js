import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import {App} from './components';
import { AuthProvider, PostsProvider } from './providers';
// import {ToastProvider} from 'react-toast-notifications';
// import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <ToastProvider autoDismiss autoDismissTimeout={5000} placement='top-left'> */}
      {/* <Toaster> */}
        <AuthProvider>
          <PostsProvider>
            <App />
          </PostsProvider>
        </AuthProvider>
      {/* </Toaster> */}
    {/* </ToastProvider> */}
  </React.StrictMode>
);