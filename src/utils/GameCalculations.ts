import {CellType, DirectionInfo, FilledGrid, GameCell, Point, Dictionary} from "../types";
import * as _ from 'lodash-es';

function isEqualCell(cell1: Point, cell2: Point) {
    return cell1.x === cell2.x && cell1.y === cell2.y && cell1.z === cell2.z;
}

function sortMap<K>(cells: Map<number, K>): Map<number, K> {
    return new Map([...cells.entries()].sort((cell1, cell2) => cell2[0] - cell1[0]));
}

export function getUpdatedGameGrid(serverPoints: Point[], baseGrid: GameCell[], gameGrid: FilledGrid): FilledGrid {
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

    return sortMap(updatedGameGrid);
}

export const groupPointArraysByAxis = (points: Point[], groupBy: keyof Point): Dictionary<Point[]> => _.groupBy(points, groupBy);

export const sortPointsByAxis = (points: Point[], sortBy: keyof Point): Point[] => {
    const sortedPoints: Point[] = _.sortBy(points, sortBy);
    return sortedPoints;
};

export const takeValuesFromPoints = (points: Point[]): number[] => {
    const values = points.map((point) => point.value);
    return values;
};

export const shiftValues = (values: number[]): number[] => {
    const shiftedValues: number[] = [];
    let indexToSkip: number;
    values.forEach((value, index) => {
        const nextIndex = index + 1;
        const nextValue = values[nextIndex];
        if (index !== indexToSkip) {
            if (!nextValue || value !== nextValue) {
                shiftedValues.push(value);
            } else {
                shiftedValues.push(value * 2);
                indexToSkip = nextIndex;
            }
        }
    });
    return shiftedValues;
};

export const createPointsWithValues = (values: number[], directionInfo: DirectionInfo, radius: number, lineIndex: number): Point[] => {
    const result: Point[] = [];
    values.forEach((value, index) => {
        let x = 0;
        let y = 0;
        let z = 0;
        const axisCoordinate = (radius - 1) - index;
        if (directionInfo.groupBy === 'x') {
            x = lineIndex;
            if (directionInfo.sortBy === 'y') {
                y = 0 - axisCoordinate - (lineIndex < 0 ? lineIndex : 0);
                z = axisCoordinate - (lineIndex < 0 ? 0 : lineIndex);
            } else {
                z = 0 - axisCoordinate - (lineIndex < 0 ? lineIndex : 0);
                y = axisCoordinate - (lineIndex < 0 ? 0 : lineIndex);
            }
        }
        if (directionInfo.groupBy === 'y') {
            y = lineIndex;
            if (directionInfo.sortBy === 'x') {
                x = 0 - axisCoordinate - (lineIndex < 0 ? lineIndex : 0);
                z = axisCoordinate - (lineIndex < 0 ? 0 : lineIndex);
            } else {
                x = axisCoordinate - (lineIndex < 0 ? 0 : lineIndex);
                z = 0 - axisCoordinate - (lineIndex < 0 ? lineIndex : 0);
            }
        }
        if (directionInfo.groupBy === 'z') {
            z = lineIndex;
            if (directionInfo.sortBy === 'x') {
                x = 0 - axisCoordinate - (lineIndex < 0 ? lineIndex : 0);
                y = axisCoordinate - (lineIndex < 0 ? 0 : lineIndex);
            } else {
                x = axisCoordinate - (lineIndex < 0 ? 0 : lineIndex);
                y = 0 - axisCoordinate - (lineIndex < 0 ? lineIndex : 0);
            }
        }
        const newPoint = {
            x, y, z, value,
        };
        result.push(newPoint);
    });
    return result;
};

export const calculatePointsOnDirection = (directionInfo: DirectionInfo, gameStatePoints: Point[], radius: number): Point[] => {
    const {groupBy, sortBy} = directionInfo;

    const groupedPointArrays = groupPointArraysByAxis(gameStatePoints, groupBy);

    const sortedPointArrays = Object.values(groupedPointArrays).map((pointArray) => sortPointsByAxis(pointArray, sortBy));

    const groupedPointIndexes = Object.keys(groupedPointArrays);

    const valueArrays = sortedPointArrays.map((pointArray) => takeValuesFromPoints(pointArray));

    const shiftedValueArrays = valueArrays.map((valueArray) => shiftValues(valueArray));

    const shiftedPointArrays = shiftedValueArrays.map((valueArray, index) =>
        createPointsWithValues(valueArray, directionInfo, radius, parseInt(groupedPointIndexes[index], 10)
        ));

    return ([] as Point[]).concat(...shiftedPointArrays);
};

