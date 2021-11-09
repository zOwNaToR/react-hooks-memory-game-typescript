import React from 'react';
import Card, { CardWithId } from './Card';

interface GameBoardProps {
	cards: CardWithId[];
	setChoice: (card: CardWithId) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, setChoice }) => {
	console.log('render game board');

	return (
		<div className='grid grid-cols-4 gap-4 mb-4'>
			{cards.map((card) => (
				<Card
					key={card.id}
					src={card.src}
					found={card.found}
					flipped={card.flipped}
					onClick={() => setChoice(card)}
				/>
			))}
		</div>
	);
};

export default GameBoard;
