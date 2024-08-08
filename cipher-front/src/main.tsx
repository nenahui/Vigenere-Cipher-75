import { ConfigProvider, theme } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{ algorithm: [theme.darkAlgorithm, theme.compactAlgorithm] }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
