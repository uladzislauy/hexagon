import React, {CSSProperties} from 'react';
import {CellSize, GameCell} from "../../types";
import './GridCell.css';

interface GridCellProps {
    cellSize: CellSize;
    gridCell: GameCell;
}

export const GridCell: React.FC<GridCellProps> = ({cellSize, gridCell}) => {
    const hexStyle: CSSProperties = {
        position: "absolute",
        left: gridCell.left,
        top: gridCell.top
    }

    return (
        <div style={hexStyle}>
            <svg width={cellSize.width} height={cellSize.height}>
                <path className="cell" d={gridCell.points}></path>
            </svg>
        </div>
    );
};
