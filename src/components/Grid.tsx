import React from 'react';
import {Point} from "../types";

interface GridProps { currentGrid: Point[] }

export const Grid: React.FC<GridProps> = ({ currentGrid }) => {
    const gridElements = currentGrid.map(point =>{
        const {x, y, z, value} = point;
        return <li key={`${x};${y};${z}`}>{value}</li>;
    });

    return (
        <ul>
            {gridElements}
        </ul>
    );
};
