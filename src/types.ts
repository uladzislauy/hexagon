export interface Point {
    x: number,
    y: number,
    z: number,
    value: number
}

export enum GameStatuses {
    RoundSelect = "round-select",
    Playing = "playing",
    GameOver = "game-over"
}
