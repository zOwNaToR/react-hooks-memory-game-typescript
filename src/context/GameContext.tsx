import React, { createContext } from 'react';

export const GameContext = createContext({
	onNewMatch: () => {},
});

const GameContextProvider: React.FC = ({ children }) => {
	return <GameContext.Provider value={{ onNewMatch: () => {} }}>{children}</GameContext.Provider>;
};

export default GameContextProvider;
