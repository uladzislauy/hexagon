import React, {CSSProperties} from 'react';
import {CellSize, GameCell} from "../../types";
import './GridCell.css';

interface GridCellProps {
    cellSize: CellSize;
    gameCell: GameCell;
}

export const GridCell: React.FC<GridCellProps> = ({cellSize, gameCell}) => {
    const style: CSSProperties = {
        position: "absolute",
        left: gameCell.left,
        top: gameCell.top
    }

    const {width, height} = cellSize;
    const {x, y, z, value, points} = gameCell;

    return <div style={style} data-x={x} data-y={y} data-z={z} data-value={value}>
        <svg width={width} height={height}>
            <path className="cell" d={points}></path>
            <g className="textCell">
                <text x="50%" y="50%" fontSize={`${width / 4}px`} textAnchor="middle" dominantBaseline="middle">
                    {value || ''}
                </text>
            </g>
        </svg>
    </div>
};
