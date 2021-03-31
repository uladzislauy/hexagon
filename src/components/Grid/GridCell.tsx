import React, {CSSProperties} from 'react';
import {CellSize, CellType, GameCell} from "../../types";
import './GridCell.css';

interface GridCellProps {
    cellSize: CellSize;
    gameCell: GameCell;
}

export const GridCell: React.FC<GridCellProps> = ({cellSize, gameCell}) => {
    const cellStyle: CSSProperties = {
        position: "absolute",
        left: gameCell.left,
        top: gameCell.top
    }

    const cellContent = (gameCell.type === CellType.base)
        ? <path className="cell" d={gameCell.points}></path>
        : <g className="textCell">
            <text x="50%" y="50%" fontSize={`${cellSize.width / 4}px`} textAnchor="middle" dominantBaseline="middle">
                {gameCell.value || ''}
            </text>
        </g>

    return <div style={cellStyle} data-x={gameCell.x} data-y={gameCell.y} data-z={gameCell.z} data-value={gameCell.value}>
        <svg width={cellSize.width} height={cellSize.height}>
            {cellContent}
        </svg>
    </div>
};
