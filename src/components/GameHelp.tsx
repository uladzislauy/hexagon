import React, {useEffect} from "react";
import {GameHelpText} from "../consts";

export interface GameHelpProps {
    keydownHandler: (evt: KeyboardEvent) => void,
}

export const GameHelp: React.FC<GameHelpProps> = ({ keydownHandler }) => {
    useEffect(() => {
        window.addEventListener('keydown', keydownHandler);
        return () => window.removeEventListener('keydown', keydownHandler);
    }, [keydownHandler]);

    return (
        <div>{GameHelpText}</div>
    );
};
