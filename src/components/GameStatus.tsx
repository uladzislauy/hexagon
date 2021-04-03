import React from "react";
import {GameStatuses} from "../consts";

interface GameStatusProps {
    currentStatus: GameStatuses,
    score: number
}

export const GameStatus: React.FC<GameStatusProps> = ({currentStatus, score}) => {
    return <div>
        <div>Game status: <span data-status={currentStatus}>{currentStatus}</span></div>
        <div>Current score: <span id='gameScore'>{score}</span></div>
    </div>
};
