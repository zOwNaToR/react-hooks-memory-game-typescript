import React from 'react';
import '../styles/Overlay.css';

interface OverlayProps {
	className?: string;
	visible: boolean;
	centerText?: boolean;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Overlay: React.FC<OverlayProps> = ({ children, className, visible, centerText, onClick }) => {
	const cssClasses = `${className ? className : ''} 
      ${centerText ? 'justify-center items-center' : ''}`;

	return (
		<>
			{visible && (
				<div className={`${cssClasses} overlay`} onClick={onClick}>
					{children}
				</div>
			)}
		</>
	);
};

export default Overlay;
