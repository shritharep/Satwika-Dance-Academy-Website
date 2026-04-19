import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();

    return (
        <section id='about' className='about-section'>
            <div className='section-content'>
                <div className='about-details'>
                    <h2 className='section-title'>{t('about.title')}</h2>
                    <p className='section-description'>{t('about.description')}</p>
                </div>
            </div>
        </section>
    );
};

export default About;
