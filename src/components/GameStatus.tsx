import React, {CSSProperties} from "react";
import {GameStatuses} from "../consts";

interface GameStatusProps {
    currentStatus: GameStatuses,
    score: number
}

export const GameStatus: React.FC<GameStatusProps> = ({currentStatus, score}) => {
    const style: CSSProperties = {
        marginTop: "5px"
    }

    return <div>
        <div>Game status: <span data-status={currentStatus}>{currentStatus}</span></div>
        <div style={style}>Current score: <span id='gameScore'>{score}</span></div>
    </div>
};
