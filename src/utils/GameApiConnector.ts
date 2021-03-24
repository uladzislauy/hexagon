import axios, {AxiosInstance} from "axios";

export const beHost = "//68f02c80-3bed-4e10-a747-4ff774ae905a.pub.instances.scw.cloud";

let gameApiConnector: AxiosInstance;

export function createGameApiConnector(host: string): void {
    gameApiConnector = axios.create({
        baseURL: host,
    })
}

export function getGameApiConnector(): AxiosInstance {
    return gameApiConnector;
}
