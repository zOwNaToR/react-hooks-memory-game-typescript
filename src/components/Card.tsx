import React from 'react';
import '../styles/Card.css';

export type CardType = {
	src: string;
	found: boolean;
	flipped: boolean;
};

export type CardWithId = CardType & {
	id: number;
};

type CardProps = CardType & {
	onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Card: React.FC<CardProps> = ({ src, flipped, onClick }) => {
	return (
		<div
			className={`card relative rounded overflow-hidden ${flipped ? 'flipped' : ''}`}
			onClick={onClick}
		>
			<img src={src} className='front absolute bg-custom-color' alt='Fronte della carta' />
			<img src='/images/cover.png' className='back top-0' alt='Retro della carta' />
		</div>
	);
};

export default Card;
