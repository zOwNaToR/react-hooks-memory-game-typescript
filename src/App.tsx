import React from 'react';
import './App.css';
import MemoryGame from './components/MemoryGame';
// import Modal from './components/Modal';

const App = () => {
	return (
		<>
			<div className='px-2 md:px-3 lg:px-4'>
				<MemoryGame />
			</div>
		</>
	);
};

export default App;
