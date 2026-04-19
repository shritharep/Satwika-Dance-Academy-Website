import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ lang }) => {
    const location = useLocation();

    const switchLanguage = (newLang) => {
        const pathSegments = location.pathname.split('/');
        pathSegments[1] = newLang;
        return pathSegments.join('/');
    };

    return (
        <header className='header'>
            <nav className='nav-links'>
                <Link to={`/${lang}`}>Home</Link>
                <Link to={`/${lang}#about`}>About</Link>
                <Link to={`/${lang}#offer`}>What We Offer</Link>
                <Link to={`/${lang}#book`}>Book Your First Class Today</Link>
                <Link to={`/${lang}#contact`}>Contact Us</Link>
            </nav>
            <div className='locale-options'>
                <Link to={switchLanguage('en')}>EN</Link>
                <Link to={switchLanguage('fr')}>FR</Link>
            </div>
        </header>
    );
};

export default Header;
