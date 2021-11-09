import React from 'react';
import '../styles/CoolText.css';

interface CoolTextProps {
	className?: string;
}

const CoolText: React.FC<CoolTextProps> = ({ children, className }) => {
	return <span className={`cooltext ${className ? className : ''}`}>{children}</span>;
};

export default CoolText;
