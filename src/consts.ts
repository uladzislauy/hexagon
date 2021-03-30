import {DirectionInfo} from "./types";

export enum GameStatuses {
    RoundSelect = "Round select",
    Playing = "Playing",
    GameOver = "Game over"
}

export const GameSizes = [2, 3, 4];

export const LayoutWidth = 650;

export const DefaultGameSize = 0;

export const GameHelpText = "Use q, w, e, a, s, d keys for move";

export enum Directions {
    UP = "KeyW",
    DOWN = "KeyS",
    UP_LEFT = "KeyQ",
    DOWN_RIGHT = "KeyD",
    UP_RIGHT = "KeyE",
    DOWN_LEFT = "KeyA",
}

export const HEX_GROUP_DIRECTIONS: Map<Directions, DirectionInfo> = new Map([
    [Directions.UP, {groupBy: 'x', sortBy: 'z'}],
    [Directions.DOWN, {groupBy: 'x', sortBy: 'y'}],
    [Directions.UP_LEFT, {groupBy: 'z', sortBy: 'x'}],
    [Directions.DOWN_RIGHT, {groupBy: 'z', sortBy: 'y'}],
    [Directions.UP_RIGHT, {groupBy: 'y', sortBy: 'z'}],
    [Directions.DOWN_LEFT, {groupBy: 'y', sortBy: 'x'}],
]);
