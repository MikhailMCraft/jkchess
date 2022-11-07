import React, { useState, createContext } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [room, setRoom] = useState(null);
    const [game, setGame] = useState(null);
    return (
        <GameContext.Provider value={{ game, setGame }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;