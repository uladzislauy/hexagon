import React from 'react';
import {CellSize, FilledGrid, GameCell} from "../../types";
import {GridCell} from "./GridCell";
import "./Grid.css";

interface GridProps {
    cellSize: CellSize;
    baseGrid: FilledGrid;
    gameGrid: FilledGrid;
}

export const Grid: React.FC<GridProps> = ({cellSize, baseGrid, gameGrid}) => {
    baseGrid.forEach((baseCell) => {
        for (const gameCell of gameGrid.values()) {
            if (gameCell.x === baseCell.x && gameCell.y === baseCell.y && gameCell.z === baseCell.z) {
                baseCell.value = gameCell.value;
            }
        }
    });

    const gridCells = [...baseGrid.entries()].map(([key, value]: [number, GameCell]) => {
        return <GridCell key={key} cellSize={cellSize} gameCell={value}/>
    });

    return <div className="grid">{gridCells}</div>;
};
