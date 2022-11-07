import React from 'react';
import { FaFlag } from 'react-icons/fa';
// import { GameContext } from '../../contexts/GameContext';
import Board from '../../components/Board';
import './Play.scss';

const Play = () => {
    // const { room } = useContext(GameContext);
    const handleDraw = () => {

    };
    const handleResign = () => {

    };
    return (
        <div id="play">
            {/* <div className="stats">
                <div>

                </div>
                <div>
                    <h1 className="clock">5:00</h1>
                </div>
            </div> */}
            <Board />
            {/* <div className="stats">
                <div>

                </div>
                <div>
                    <button className="draw" onClick={handleDraw}>
                        <p>½</p>
                    </button>
                    <button className="resign" onClick={handleResign}>
                        <FaFlag className="icon" />
                    </button>
                    <h1 className="clock">5:00</h1>
                </div>
            </div> */}
        </div>
    );
};

export default Play;