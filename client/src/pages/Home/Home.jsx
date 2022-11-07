import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SocketContext from '../../contexts/SocketContext';
import GameContext from '../../contexts/GameContext';
import Select from '../../components/Select';
import uuid from 'react-uuid';
import './Home.scss';

const Home = () => {
    const navigate = useNavigate();
    const socket = useContext(SocketContext);
    const { setRoom } = useContext(GameContext);
    const [type, setType] = useState('Random Matchmaking');
    const [error, setError] = useState(null);
    const roomRef = useRef('');
    const handlePlay = () => {
        switch (type) {
            case 'Random Matchmaking':
                gameName.current = uuid();
                socket.emit('join', gameName.current);
                setRoom(gameName.current);
                navigate('/play');
                break;
            case 'Create Game':
                if (gameName.current.value === '') {
                    setError("Please enter a game name");
                    break;
                }
                fetch(`http://localhost:3001/game/exists?name=${gameName.current.value}`)
                    .then(res => res.json())
                    .then(data => {
                        if (!data.exists) {
                            socket.emit('join', gameName.current.value);
                            setRoom(gameName.current.value);
                            navigate('/play');
                        }
                        else {
                            setError("Game name already exists!");
                        }
                    })
                    .catch(err => console.log(err.message))
                break;
            case 'Join Game':
                if (gameName.current.value === "") {
                    setError("Please enter a game name");
                    break;
                }
                fetch(`http://localhost:3001/game/exists?name=${gameName.current.value}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.exists) {
                            socket.emit('join', gameName.current.value);
                            setRoom(gameName.current.value);
                            navigate('/play');
                        }
                        else {
                            setError("Game name doesn't exist!");
                        }
                    })
                    .catch(err => console.log(err.message))
                break;
            default:
                break;
        }
    };
    return (
        <div id="home">
            <h1 className="title">jkchess</h1>
            <p className="description">
                is a chess variant created by Jordan Katz and inspired by
                <a href="https://en.wikipedia.org/wiki/Fischer_random_chess">Fischer Random (Chess960)</a>,
                whereas the pieces on the home ranks are randomly rearranged before the game in the same fashion.
                However, there is no castling, and the player that moves first is also randomized.
            </p>
            <Select 
                className="type"
                value={type} 
                setValue={setType} 
                options={['Random Matchmaking', 'Create Game', 'Join Game']} 
            />
            {type !== 'Random Matchmaking' && (
                <div className="room">
                    <input
                        type="text"
                        placeholder="game room"
                        ref={roomRef}
                    />
                    {error && <p className="error">{error}</p>}
                </div> 
            )}
            <button className="play" onClick={handlePlay}>Play</button>
        </div>
    );
};

export default Home;