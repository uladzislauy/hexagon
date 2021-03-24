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
}

export type BaseGrid = GameCell[];
