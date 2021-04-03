import {BaseGrid, CellSize, GameCell, Point, Point2D} from "../types";

export function calculateCellRadius(layoutWidth: number, gameSize: number): number {
    return roundDecimals(layoutWidth / (3 * gameSize - 1));
}

export function calculateCellSizeByRadius(cellRadius: number): CellSize {
    return {
        width: roundDecimals(2 * cellRadius),
        height: roundDecimals(2 * cellRadius * Math.sin(Math.PI / 180 * 60))
    };
}

export function calculateCellCornerPoints(cellSize: CellSize, cellRadius: number): Point2D[] {
    const corners: Point2D[] = [];

    for (let i = 0; i < 6; i++) {
        corners.push(calculateCellCorner(cellSize, cellRadius, i));
    }

    return corners;
}

export function buildBaseGrid(gameSize: number, cellRadius: number, cellCorners: Point2D[]): BaseGrid {
    const cellGrid = [];
    const indexLimit = gameSize - 1;

    for (let x = -indexLimit, n = 0; x <= indexLimit; x++) {
        const y0 = Math.max(-indexLimit, -x - indexLimit);
        const yN = Math.min(indexLimit, -x + indexLimit);
        for (let y = y0; y <= yN; y++, n++) {
            const cube: Point = {x, y, z: -x - y, value: 0};
            const pixelCoordinates: Point2D = mapCubeToPixelCoordinates(cube, cellRadius, gameSize);
            const points: string = mapCellCornersToSVGPath(cellCorners);
            const gridCell: GameCell = {
                ...cube,
                left: pixelCoordinates.x,
                top: pixelCoordinates.y,
                points
            };
            cellGrid.push(gridCell);
        }
    }

    return cellGrid;
}

function calculateCellCorner(cellSize: CellSize, cellRadius: number, index: number): Point2D {
    const angle_deg = 60 * index;
    const angle_rad = Math.PI / 180 * angle_deg;

    return {
        x: roundDecimals(cellSize.width / 2 + cellRadius * Math.cos(angle_rad)),
        y: roundDecimals(cellSize.height / 2 + cellRadius * Math.sin(angle_rad))
    };
}

function mapCubeToPixelCoordinates(cube: Point, cellRadius: number, gameSize: number): Point2D {
    return {
        x: roundDecimals(cellRadius * 3 / 2 * (cube.x + gameSize - 1)),
        y: roundDecimals(cellRadius * Math.sqrt(3) * (0.5 * cube.x + (cube.z + gameSize - 1)))
    };
}

function mapCellCornersToSVGPath(points: Point2D[]): string {
    return points
        .map((corner, index) => {
            return index === 0
                ? `M${corner.x} ${corner.y}`
                : `L${corner.x} ${corner.y}`;
        })
        .concat("Z")
        .join(' ');
}

function roundDecimals(n: number): number {
    return parseFloat(n.toFixed(2));
}
