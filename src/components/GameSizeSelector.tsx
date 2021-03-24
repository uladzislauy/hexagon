import React from "react";
import {GameSizes} from "../consts";
import classNames from 'classnames';

interface GameSizeSelectorProps {
    selectedSize: number,
    setSelectedSize: (size: number) => void,
}

export const GameSizeSelector: React.FC<GameSizeSelectorProps> = ({selectedSize, setSelectedSize}) => {
    const buttons = GameSizes.map((buttonSize) => {
        const btnClass = classNames({'selected': selectedSize === buttonSize});
        return <button  className={btnClass} value={buttonSize} onClick={_ => setSelectedSize(selectedSize)}>{buttonSize}</button>
    });

    return (
        <div>
            Select game size: {buttons}
        </div>
    );
};
