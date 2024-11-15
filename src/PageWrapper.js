import React from 'react';
import './styles/pageBackgrounds.css';

const PageWrapper = ({ children, className }) => {
    return <div className={`page ${className}`}>{children}</div>;
};

export default PageWrapper;