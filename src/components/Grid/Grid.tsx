import React from 'react';
import {BaseGrid, CellSize} from "../../types";
import {GridCell} from "./GridCell";

interface GridProps {
    cellSize: CellSize;
    baseGrid: BaseGrid;
}

export const Grid: React.FC<GridProps> = ({cellSize, baseGrid}) => {
    const gridCells = baseGrid.map((gridCell, index) => {
        return <GridCell key={index} cellSize={cellSize} gridCell={gridCell}/>
    });

    return <div>{gridCells}</div>;
};
