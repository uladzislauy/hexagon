import {DirectionInfo} from "./types";

export const NewGameStatuses = new Map([
    ["RoundSelect", "round-select"],
    ["Playing", "playing"],
    ["GameOver", "game-over"],
])

export enum GameStatuses {
    RoundSelect = "round-select",
    Playing = "playing",
    GameOver = "game-over"
}

export const GameSizes = [2, 3, 4];

export const LayoutWidth = 650;

export const DefaultGameSize = 0;

export const GameHelpText = "Use q, w, e, a, s, d keys for move";

export const BeHost = "//68f02c80-3bed-4e10-a747-4ff774ae905a.pub.instances.scw.cloud";

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
