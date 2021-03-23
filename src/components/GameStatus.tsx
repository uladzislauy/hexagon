import React from "react";
import {GameStatuses} from "../types";

export const GameStatus: React.FC = () => {
    return (
        <div>Gaming status: {GameStatuses.RoundSelect}</div>
    );
};
