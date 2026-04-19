import './App.css';
import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom';

import Home from '../components/home';
import About from '../components/about';
import LanguageWrapper from '../components/languageWrapper';
import { Suspense } from 'react';
import './i18n';

const AppContent = () => {
    const routes = useRoutes([
        { path: '/', element: <Navigate to='/en' replace /> },
        {
            path: '/:lang',
            element: <LanguageWrapper />,
            children: [
                { path: '', element: <Home /> },
                { path: 'about', element: <About /> },
            ],
        },
        { path: '*', element: <Navigate to='/en' replace /> },
    ]);

    return (
        <Suspense fallback={<div>Loading translations...</div>}>
            {routes}
        </Suspense>
    );
};

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
