import { ConfigProvider, theme } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import './index.css';
import { store } from './app/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ algorithm: [theme.compactAlgorithm] }}>
        <App />
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
