import React from 'react';
import { RecoilRoot } from 'recoil';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.querySelector('#root')!).render(
    <React.StrictMode>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </React.StrictMode>
);
