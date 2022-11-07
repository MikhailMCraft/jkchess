import React, { useContext } from 'react';
import GameContext from '../../contexts/GameContext';
import { Chessboard } from 'react-chessboard';
import { generateSetupFen } from '../../utils/helpers';
import './Board.scss';

const Board = () => {
    const { game, setGame } = useContext(GameContext);
    return (
        <div className="board">
            <Chessboard 
                position={generateSetupFen()}
            />
        </div>
    );
};

export default Board;