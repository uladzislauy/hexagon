import React, {CSSProperties, useEffect} from "react";
import {GameHelpText} from "../consts";

export interface GameHelpProps {
    keydownHandler: (evt: KeyboardEvent) => void,
}

export const GameHelp: React.FC<GameHelpProps> = ({keydownHandler}) => {
    const style: CSSProperties = {
        margin: "5px"
    }

    useEffect(() => {
        window.addEventListener('keydown', keydownHandler);
        return () => window.removeEventListener('keydown', keydownHandler);
    }, [keydownHandler]);

    return <div style={style}>{GameHelpText}</div>
};
