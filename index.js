import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './i18n/App';
import { report } from 'node:process';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
