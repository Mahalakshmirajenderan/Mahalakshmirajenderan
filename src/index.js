import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'dayjs/locale/en'; // or the locale you are using
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { ConfigProvider } from 'antd';

dayjs.extend(customParseFormat);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ConfigProvider dateAdapter={dayjs}>
    <App />
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
