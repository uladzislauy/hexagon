import React, {useCallback} from "react";
import {GameSizes} from "../consts";
import classNames from 'classnames';

interface GameSizeSelectorProps {
    selectedSize: number,
    setSelectedSize: (size: number) => void,
}

export const GameSizeSelector: React.FC<GameSizeSelectorProps> = ({selectedSize, setSelectedSize}) => {
    const buttons = GameSizes.map((buttonSize) => {
        const btnClass = classNames({'selected': selectedSize === buttonSize});

        const onClick = useCallback(((event: React.MouseEvent<HTMLButtonElement>) => {
            const selectedSize = parseInt(event.currentTarget.value);
            setSelectedSize(selectedSize);
        }), [setSelectedSize]);

        return <button  className={btnClass} value={buttonSize} onClick={onClick}>{buttonSize}</button>
    });

    return (
        <div>
            Select game size: {buttons}
        </div>
    );
};
