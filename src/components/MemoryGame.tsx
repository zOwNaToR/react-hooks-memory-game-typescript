import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { CardType, CardWithId } from './Card';
import Button from './Button';
import Firework from './Firework';
import Overlay from './Overlay';
import CoolText from './CoolText';
import GameBoard, { cardGridColumns } from './GameBoard';
import useEffectSkipFirstRender from '../hooks/useEffectSkipFirstRender';

const cardImgs: CardType[] = [
	// { src: '/images/helmet.png', flipped: false, found: false },
	// { src: '/images/potion.png', flipped: false, found: false },
	// { src: '/images/ring.png', flipped: false, found: false },
	// { src: '/images/scroll.png', flipped: false, found: false },
	// { src: '/images/shield.png', flipped: false, found: false },
	// { src: '/images/sword.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/armor.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/axe.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/axeDouble.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/backpack.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/bow.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/coin.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/dagger.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/envelope.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/gemBlue.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/gemGreen.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/gemRed.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/hammer.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/heart.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/helmet.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/map.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/potionBlue.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/potionGreen.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/potionRed.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/scroll.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/shield.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/tome.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/tools.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/upg_spear.png', flipped: false, found: false },
	{ src: '/images/IconPack/512/wand.png', flipped: false, found: false },
];

// interface MemoryGameProps {}

const MemoryGame: React.FC = () => {
	const [cards, setCards] = useState<CardWithId[]>([]);
	const [firstChoice, setFirstChoice] = useState<CardWithId | null>(null);
	const [secondChoice, setSecondChoice] = useState<CardWithId | null>(null);
	const [matchWon, setMatchWon] = useState(false);
	const [tryCount, setTryCount] = useState(0);

	const transitions = useTransition(matchWon, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		reverse: matchWon,
		delay: 400,
	});

	const getUniqueCards = (n: number = cardImgs.length) => {
		return cardImgs
			.map((card) => ({
				...card,
				id: Math.random(),
			}))
			.sort((card) => card.id - 0.5)
			.slice(0, n);
	};
	const shuffleCards = () => {
		var possibleCardNumbers = Object.keys(cardGridColumns);
		const uniqueCards = getUniqueCards(+possibleCardNumbers[3]);

		// Duplicate card images, assign a random id and sort randomly with their id
		const shuffledCards: CardWithId[] = [...uniqueCards, ...uniqueCards]
			.map((card) => ({
				...card,
				id: Math.random(),
			}))
			.sort((card) => card.id - 0.5);

		setCards(shuffledCards);
	};

	// Set card as first/second choice based on current first and second choices value
	const handleChoice = (card: CardWithId) => {
		// Set choice only if atleast 1 choice hasn't been taken
		if (!firstChoice || !secondChoice) {
			// If the first choice has been taken and the card clicked is not the same
			if (firstChoice && firstChoice.id !== card.id) {
				setSecondChoice(card);
				setTryCount((prev) => prev + 1);
			} else {
				setFirstChoice(card);
			}
		}
	};
	// If both choices have been made and have the same image (src), set them as found
	const handleFoundCards = () => {
		if (firstChoice && secondChoice) {
			if (firstChoice?.src === secondChoice?.src) {
				setCards((prevCards) =>
					prevCards.map((card) => ({
						...card,
						found: card.found || card.src === firstChoice?.src,
					}))
				);
			}
		}
	};
	// If both choices have been made, hide reset them after n milliseconds
	const resetChoicesAfterMs = (ms: number) => {
		if (firstChoice && secondChoice) {
			let timeoutHideChoices = setTimeout(() => {
				setFirstChoice(null);
				setSecondChoice(null);
			}, ms);

			return () => {
				clearTimeout(timeoutHideChoices);
			};
		}
	};
	// Set first/second choice correspondig cards, and found cards as flipped
	const handleFlipCards = () => {
		setCards((prevCards) =>
			prevCards.map((prevCard) => ({
				...prevCard,
				flipped: prevCard.found || [firstChoice?.id, secondChoice?.id].includes(prevCard.id),
			}))
		);
	};

	const newMatch = () => {
		shuffleCards();
		setFirstChoice(null);
		setSecondChoice(null);
		setMatchWon(false);
		setTryCount(0);
	};
	const winMatch = () => {
		setMatchWon(true);
	};

	// Shuffle cards at first render
	useEffect(() => {
		shuffleCards();
	}, []);

	// Handle the win if all the cards are found
	useEffectSkipFirstRender(() => {
		if (cards.every((card) => card.found)) {
			winMatch();
		}
	}, [cards]);

	// Handle choices changes:
	// Set flipped to true if cards are found or are the first/second choice
	// Set found to true if first and second choices have the same src, reset choiches to null if both choices have been made
	useEffectSkipFirstRender(() => {
		handleFlipCards();

		handleFoundCards();

		return resetChoicesAfterMs(800);
	}, [firstChoice, secondChoice]);

	return (
		<>
			<div className='flex flex-col items-center justify-center'>
				<h1 className='text-3xl mb-4'>Memo</h1>
				<Button color='pink' className='mb-4' onClick={newMatch}>
					Nuova partita
				</Button>
				{/* <Button color='pink' className='mb-4' onClick={winMatch}>
					Vinci
				</Button> */}
				<div>Tentativi effettuati: {tryCount}</div>
				<GameBoard setChoice={handleChoice} cards={cards} />
			</div>

			<Overlay visible={matchWon} centerText={true} onClick={() => setMatchWon(false)}>
				{transitions(
					(styles, item) =>
						item && (
							<animated.div style={styles}>
								<CoolText className='text-9xl'>HAI VINTO! ✌️</CoolText>
							</animated.div>
						)
				)}
				<Firework />
			</Overlay>
		</>
	);
};

export default MemoryGame;
