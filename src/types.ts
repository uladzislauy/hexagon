export interface Point2D {
    x: number;
    y: number;
}

export interface Point extends Point2D {
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

export interface Dictionary<T> {
    [index: string]: T;
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
