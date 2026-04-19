import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Header from '../header';

const LanguageWrapper = () => {
    const { lang } = useParams();
    const { i18n } = useTranslation();

    useEffect(() => {
        if (lang && i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang, i18n]);

    return (
        <>
            <Header lang={lang} />
            <div style={{ marginTop: '50px' }}>
                <Outlet />
            </div>
        </>
    );
};

export default LanguageWrapper;
