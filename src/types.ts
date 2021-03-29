export type Point = Point2D & {
    z: number,
    value: number
}

export type CellSize = {
    width: number;
    height: number
}

export type Point2D = {
    x: number;
    y: number;
}

export interface GameCell extends Point {
    points: string;
    top: number;
    left: number;
    type: CellType;
}

export type BaseGrid = GameCell[];

export type PointWithValue = Point & {
    value: number;
}

export enum CellType {
    base,
    game
}

export type FilledGrid = Map<number, GameCell>;
