import React, { useEffect } from 'react';
import fx from 'fireworks';

let range = (n: number) => [...new Array(n)];

const body = document.querySelector('body');
const maxNumber = 10;

const Firework: React.FC = () => {
	useEffect(() => {
		let counter = 0;

		let interval = setInterval(() => {
			// Repeat the loop max 10 times
			if (counter < maxNumber) {
				range(7).forEach(() => {
					let x = Math.random() * (body!.clientWidth - 180);
					let y = Math.random() * (body!.clientHeight - 180);

					fx({
						x: x,
						y: y,
						colors: ['#cc3333', '#4CAF50', '#81C784'],
					});
				});

				counter++;
			} else clearInterval(interval);
		}, 500);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return <div></div>;
};

export default Firework;
