export type Point2D = {
    x: number;
    y: number;
}

export type Point = Point2D & {
    z: number,
    value: number
}

export type CellSize = {
    width: number;
    height: number
}

export interface GameCell extends Point {
    points: string;
    top: number;
    left: number;
    type: CellType;
}

export type BaseGrid = GameCell[];

export enum CellType {
    base,
    game
}

export type FilledGrid = Map<number, GameCell>;

export type Coordinate = keyof Point;

export type DirectionInfo = {
    groupBy: Coordinate,
    sortBy: Coordinate
}
