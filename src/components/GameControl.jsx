import {useEffect, useRef, useState} from "react";

import GameConfiguration from "./config/GameConfiguration.jsx";
import MonsterList from "./monster/MonsterList.jsx";
import useMonsters from "../hooks/useMonster.js";
import MonsterConfiguration from "./config/MonsterConfiguration.jsx";

const GameControl = () => {
    const {monsters, gameStart, nextRound, gameOver} = useMonsters();
    const [gameRunning, setGameRunning] = useState(false);
    const [gamePaused, setGamePaused] = useState(false);

    const roundRef = useRef(0);
    const delayConfig = useRef(100);

    const handleDelayChange = (delay) => {
        delayConfig.current = delay;
    };

    const startGame = () => {
        roundRef.current = 0;
        setGameRunning(true);
        gameStart();
    };

    const togglePauseGame = () => {
        setGamePaused(!gamePaused);
    };

    const stopGame = () => {
        setGamePaused(false);
        setGameRunning(false);
    };

    useEffect(() => {
        let timerId;

        const playGame = () => {
            if (gameRunning && !gameOver()) {
                roundRef.current++;
                if (!gamePaused) {
                    nextRound(roundRef.current);

                    timerId = setTimeout(playGame, delayConfig.current);
                }
            } else {
                // Is this necessary?
                setGameRunning(false);
            }
        }

        if (gameRunning) {
            playGame();
        }

        return () => {
            clearTimeout(timerId); // Cleanup on unmount or isRunning change
        };
    }, [gameRunning, gamePaused]);

    return (<>
            <div>
                <GameConfiguration delayChangeHandler={handleDelayChange} defaultDelay={delayConfig.current}/>

                <MonsterConfiguration/>

                <p className="text-center mt-5 mb-3">
                    The buttons below control the execution of the game.
                </p>

                <p className="text-center">
                    <button className="btn btn-primary me-1" onClick={startGame} disabled={gameRunning}>Start Game
                    </button>
                    <button className="btn btn-primary me-1" onClick={togglePauseGame} disabled={!gameRunning}>
                        {gamePaused ? "Continue Game" : "Pause Game"}
                    </button>
                    <button className="btn btn-primary ms-1" onClick={stopGame} disabled={!gameRunning}>Stop Game
                    </button>
                </p>

                <MonsterList monsters={monsters}/>
            </div>
        </>)
};

export default GameControl;