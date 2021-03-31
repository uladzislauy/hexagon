import {Directions, HEX_GROUP_DIRECTIONS} from "../consts";
import {DirectionInfo} from "../types";

export function getDirectionByKey(code: string): DirectionInfo | undefined {
    let direction;

    switch (code) {
        case Directions.UP:
            direction = HEX_GROUP_DIRECTIONS.get(Directions.UP);
            break;
        case Directions.UP_LEFT:
            direction = HEX_GROUP_DIRECTIONS.get(Directions.UP_LEFT);
            break;
        case Directions.UP_RIGHT:
            direction = HEX_GROUP_DIRECTIONS.get(Directions.UP_RIGHT);
            break;
        case Directions.DOWN:
            direction = HEX_GROUP_DIRECTIONS.get(Directions.DOWN);
            break;
        case Directions.DOWN_LEFT:
            direction = HEX_GROUP_DIRECTIONS.get(Directions.DOWN_LEFT);
            break;
        case Directions.DOWN_RIGHT:
            direction = HEX_GROUP_DIRECTIONS.get(Directions.DOWN_RIGHT);
            break;
        default:
            break;
    }

    return direction;
}
