import React, { useEffect, useState } from 'react';
import Card, { CardWithId } from './Card';

interface GameBoardColumn {
	xs: number;
	md: number;
	lg: number;
}
interface GameBoardGridColumns {
	'6': GameBoardColumn;
	'8': GameBoardColumn;
	'10': GameBoardColumn;
	'12': GameBoardColumn;
	// '15': GameBoardColumn;
	// '20': GameBoardColumn;
}

export const cardGridColumns: GameBoardGridColumns = {
	'6': {
		xs: 3, // 3x4
		md: 4, // 4x3
		lg: 4, // 4x3
	},
	'8': {
		xs: 4, // 4x4
		md: 4, // 4x4
		lg: 4, // 4x4
	},
	'10': {
		xs: 4, // 4x5
		md: 5, // 5x4
		lg: 5, // 5x4
	},
	'12': {
		xs: 4, // 4x6
		md: 6, // 6x4
		lg: 6, // 6x4
	},
	// '15': {
	// 	xs: 5, // 5x6
	// 	md: 6, // 6x5
	// 	lg: 6, // 6x5
	// },
	// '20': {
	// 	xs: 5, // 5x8
	// 	md: 8, // 8x5
	// 	lg: 10, // 10x4
	// },
};

interface GameBoardProps {
	cards: CardWithId[];
	setChoice: (card: CardWithId) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, setChoice }) => {
	const [gridCols, setGridCols] = useState({ xs: 0, md: 0, lg: 0 });

	useEffect(() => {
		cards.length &&
			setGridCols({
				xs: getGridColsNumber('xs'),
				md: getGridColsNumber('md'),
				lg: getGridColsNumber('lg'),
			});
	}, [cards.length]);

	const getGridColsNumber = (breakpoint: string) => {
		console.log('getGridColsNumber');
		let uniqueCards = Array.from(new Set(cards.map((x) => x.src)));

		return uniqueCards.length
			? cardGridColumns[uniqueCards.length.toString() as keyof GameBoardGridColumns][
					breakpoint as keyof GameBoardColumn
			  ]
			: 0;
	};

	return (
		<div
			className={`grid 
				grid-cols-${gridCols.xs} 
				md:grid-cols-${gridCols.md} 
				lg:grid-cols-${gridCols.lg} 
				gap-4 mb-4`}
		>
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
