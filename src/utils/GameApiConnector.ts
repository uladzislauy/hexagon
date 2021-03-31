import axios, {AxiosInstance} from "axios";

let gameApiConnector: AxiosInstance;

export function createGameApiConnector(host: string): void {
    gameApiConnector = axios.create({
        baseURL: host,
    })
}

export function getGameApiConnector(): AxiosInstance {
    return gameApiConnector;
}
