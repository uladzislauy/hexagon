import React from 'react';
import {CellSize, FilledGrid, GameCell} from "../../types";
import {GridCell} from "./GridCell";
import "./Grid.css";

interface GridProps {
    cellSize: CellSize;
    baseGrid: FilledGrid;
}

export const Grid: React.FC<GridProps> = ({cellSize, baseGrid}) => {
    const gridCells = [...baseGrid.entries()].map(([key, value]: [number, GameCell]) => {
        return <GridCell key={key} cellSize={cellSize} gameCell={value}/>
    });

    return <div className="cellGrid">{gridCells}</div>;
};
