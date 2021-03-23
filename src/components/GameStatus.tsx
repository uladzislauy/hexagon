import React from "react";
import {GameStatuses} from "../types";

interface GameStatusProps {
    currentStatus: keyof typeof GameStatuses,
};

export const GameStatus: React.FC<GameStatusProps> = ({ currentStatus }) => (<div>Gaming status: {currentStatus}</div>);
