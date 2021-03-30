import React from "react";
import {GameStatuses} from "../consts";

interface GameStatusProps {
    currentStatus: GameStatuses,
}

export const GameStatus: React.FC<GameStatusProps> = ({ currentStatus }) => {
    return <div>Gaming status: <span data-status={currentStatus}>{currentStatus}</span></div>
};
