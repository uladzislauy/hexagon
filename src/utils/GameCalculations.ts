import {Dictionary, DirectionInfo, FilledGrid, GameCell, Point} from "../types";
import * as _ from 'lodash-es';
import {Directions, GridMovementDirections} from "../consts";

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

        updatedGameGrid.set(lastFilledCellId++, {...newCell});
    });

    return sortMap(updatedGameGrid);
}

export function calculatePointsOnDirection(directionInfo: DirectionInfo, gameStatePoints: Point[], radius: number): [Point[], number] {
    const {groupBy, sortBy} = directionInfo;
    let thisMoveScore = 0;

    const groupedPointArrays = groupPointArraysByAxis(gameStatePoints, groupBy);

    const sortedPointArrays = Object.values(groupedPointArrays).map((pointArray) => sortPointsByAxis(pointArray, sortBy));

    const groupedPointIndexes = Object.keys(groupedPointArrays);

    const valueArrays = sortedPointArrays.map((pointArray) => takeValuesFromPoints(pointArray));

    const shiftedValueArrays = valueArrays.map((valueArray) => shiftValues(valueArray));

    const shiftedPointArrays = shiftedValueArrays.map(
        (valueArray, index) => {
            thisMoveScore += valueArray[1];
            return createPointsWithValues(valueArray[0], directionInfo, radius, parseInt(groupedPointIndexes[index], 10));
        });

    return [([] as Point[]).concat(...shiftedPointArrays), thisMoveScore];
}

export function arePointsInArraysEqual(first: Point[], second: Point[]): boolean {
    if (first.length !== second.length) return false;

    let equalCells = 0;

    first.forEach(point1 => {
        second.forEach(point2 => {
            if (isEqualCell(point1, point2)) equalCells++;
        })
    })

    return equalCells === first.length;
}

export function gameOver(points: Point[], gameSize: number): boolean {
    if (points.length < getMaxPoints(gameSize)) return false;

    let gameOver = true;

    Object.values(Directions).forEach((direction) => {
        const directionInfo = GridMovementDirections.get(direction);
        if (!directionInfo) return;

        const pointsOnNewStep = calculatePointsOnDirection(directionInfo, points, gameSize)[0];
        if (pointsOnNewStep.length !== points.length) gameOver = false;
    });

    return gameOver;
}

function isEqualCell(cell1: Point, cell2: Point) {
    return cell1.x === cell2.x && cell1.y === cell2.y && cell1.z === cell2.z;
}

function sortMap<K>(cells: Map<number, K>): Map<number, K> {
    return new Map([...cells.entries()].sort((cell1, cell2) => cell2[0] - cell1[0]));
}

function groupPointArraysByAxis(points: Point[], groupBy: keyof Point): Dictionary<Point[]> {
    return _.groupBy(points, groupBy)
}

function sortPointsByAxis(points: Point[], sortBy: keyof Point): Point[] {
    const sortedPoints: Point[] = _.sortBy(points, sortBy);
    return sortedPoints;
}

function takeValuesFromPoints(points: Point[]): number[] {
    const values = points.map((point) => point.value);
    return values;
}

function shiftValues(values: number[]): [number[], number] {
    const shiftedValues: number[] = [];
    let indexToSkip: number;
    let thisMoveScore = 0;

    values.forEach((value, index) => {
        const nextIndex = index + 1;
        const nextValue = values[nextIndex];
        if (index !== indexToSkip) {
            if (!nextValue || value !== nextValue) {
                shiftedValues.push(value);
            } else {
                thisMoveScore += value * 2;
                shiftedValues.push(value * 2);
                indexToSkip = nextIndex;
            }
        }
    });

    return [shiftedValues, thisMoveScore];
}

function createPointsWithValues(values: number[], directionInfo: DirectionInfo, radius: number, lineIndex: number): Point[] {
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
}

function getMaxPoints(gameSize: number): number {
    let maxPoints = 7;
    if (gameSize === 3) maxPoints = 19;
    if (gameSize === 4) maxPoints = 37;

    return maxPoints;
}
