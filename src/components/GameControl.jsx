import {useRef, useState, useEffect} from "react";

import GameConfiguration from "./GameConfiguration";
import MonsterList from "./monster/MonsterList.jsx";
import useMonsters from "../hooks/useMonster.js";

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
                <p>
                    By default 5 monsters will play. Between each round there is a 100ms delay.
                    These values can be changed by modifying the sliders below.
                </p>

                <GameConfiguration delayChangeHandler={handleDelayChange} defaultDelay={delayConfig.current}/>

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