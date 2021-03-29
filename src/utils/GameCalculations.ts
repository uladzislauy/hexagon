import {CellType, FilledGrid, GameCell, PointWithValue} from "../types";

function isEqualCell(cell1: PointWithValue, cell2: PointWithValue) {
    return cell1.x === cell2.x && cell1.y === cell2.y && cell1.z === cell2.z;
}

function sortedByKey<K>(cells: Map<number, K>): Map<number, K> {
    return new Map([...cells.entries()].sort((cell1, cell2) => cell2[0] - cell1[0]));
}

export function getUpdatedGameGrid(serverPoints: PointWithValue[], baseGrid: GameCell[], gameGrid: FilledGrid): FilledGrid {
    const updatedGameGrid = new Map(gameGrid);

    let lastFilledCellId = gameGrid.size > 0
        ? [...gameGrid.keys()][0] + 1
        : 0;

    serverPoints.forEach((cell) => {
        const baseCellId = baseGrid.findIndex(base => isEqualCell(base, cell));

        const newCell = {
            ...baseGrid[baseCellId],
            value: cell.value
        }

        updatedGameGrid.set(lastFilledCellId++, {...newCell, type: CellType.game});
    });

    return sortedByKey(updatedGameGrid);
}
