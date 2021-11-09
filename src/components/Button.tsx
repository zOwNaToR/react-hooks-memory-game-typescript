import React from 'react';

type ButtonDimension = 'small' | 'medium' | 'large';
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	dimension?: ButtonDimension;
	color: string;
};

const getBtnPadding = (dimension: ButtonDimension) => {
	switch (dimension) {
		case 'small':
			return 'px-4 py-2';
		case 'medium':
			return 'px-6 py-3';
		case 'large':
			return 'px-8 py-4';
	}
};

const getBtnColorStyles = (color: string) => {
	return `bg-${color}-500 active:bg-${color}-600`;
};

const Button: React.FC<ButtonProps> = ({
	children,
	dimension = 'small',
	className,
	color,
	...props
}) => {
	return (
		<button
			{...props}
			className={`${className} ${getBtnPadding(dimension)} ${getBtnColorStyles(color)}
				font-bold uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
			type='button'
		>
			{children}
		</button>
	);
};

export default Button;
