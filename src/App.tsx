import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {createGameApiConnector, getGameApiConnector} from './utils/GameApiConnector';
import {ServerHost} from "./components/ServerHost";
import {BaseGrid, CellSize, FilledGrid, Point} from "./types";
import {Grid} from "./components/Grid/Grid";
import {GameStatus} from "./components/GameStatus";
import {GameSizeSelector} from "./components/GameSizeSelector";
import {GameHelp} from "./components/GameHelp";
import {BeHost, DefaultGameSize, GameStatuses, LayoutWidth} from "./consts";
import {
    buildBaseGrid,
    calculateCellCornerPoints,
    calculateCellRadius,
    calculateCellSizeByRadius
} from "./utils/GridCalculations";
import {calculatePointsOnDirection, gameOver, getUpdatedGameGrid} from "./utils/GameCalculations";
import {getDirectionByKey} from "./helpers/KeyboardHandler";

function App(): JSX.Element {
    const [hostAddress, setAddress] = useState(BeHost);
    const [gameStatus, changeGameStatus] = useState<GameStatuses>(GameStatuses.RoundSelect);

    const urlGameConfig = location.hash.match(/\d+/);
    const matchResult = (urlGameConfig) ? urlGameConfig[0].toString() : DefaultGameSize.toString();
    const urlGameSize = Number.parseInt(matchResult);
    const [gameSize, setGameSize] = useState(urlGameSize);

    const [cellSize, setCellSize] = useState<CellSize>({width: 0, height: 0});

    const [baseGameGrid, setBaseGameGrid] = useState<BaseGrid>([]);
    const [gameGrid, setGameGrid] = useState<FilledGrid>(new Map());

    const [serverPoints, setServerPoints] = useState<Point[]>([]);

    const baseGrid: FilledGrid = new Map(baseGameGrid.map((cell, index) => [index, cell]));

    useEffect(() => createGameApiConnector(hostAddress), [hostAddress]);

    useEffect(() => {
        if (gameSize === 0) return;

        fetchData(`/${gameSize}`);

        async function fetchData(url: string) {
            const gameApiConnector = getGameApiConnector();
            try {
                const response = await gameApiConnector.post<Point[]>(url, []);
                setServerPoints(response.data);
            } catch (e) {
                console.log(e);
            }
        }
    }, [gameSize, hostAddress]);

    useEffect(() => {
        if (gameSize === 0 || serverPoints.length === 0) return;

        const cellRadius = calculateCellRadius(LayoutWidth, gameSize);
        const cellSize = calculateCellSizeByRadius(cellRadius);
        const cellCorners = calculateCellCornerPoints(cellSize, cellRadius);
        setCellSize(cellSize);

        const baseGrid = buildBaseGrid(gameSize, cellRadius, cellCorners);
        const updatedGameGrid = getUpdatedGameGrid(serverPoints, baseGrid, new Map());
        setBaseGameGrid(baseGrid);
        setGameGrid(updatedGameGrid);
    }, [serverPoints, gameSize])

    useEffect(() => {
        if (serverPoints.length === 0) changeGameStatus(GameStatuses.RoundSelect);
        else if (gameOver(serverPoints, gameSize)) changeGameStatus(GameStatuses.GameOver);
        else changeGameStatus(GameStatuses.Playing);
    }, [serverPoints]);

    const handleKeyDown = useCallback((evt: KeyboardEvent) => {
        if (serverPoints.length === 0) return;

        const direction = getDirectionByKey(evt.code);
        if (!direction) return;

        const newPoints = calculatePointsOnDirection(direction, serverPoints, gameSize);

        exchangeDataWithGameApi(`/${gameSize}`);

        async function exchangeDataWithGameApi(url: string) {
            const gameApiConnector = getGameApiConnector();
            try {
                const response = await gameApiConnector.post<Point[]>(url, newPoints);
                response.data.map(newServerPoint => newPoints.push(newServerPoint));

                setServerPoints(newPoints);
            } catch (e) {
                console.log(e);
            }
        }
    }, [serverPoints]);

    return (
        <div className="App">
            <div>
                <div>Game server url</div>
                <ServerHost setServerHost={setAddress}/>
                <GameSizeSelector selectedSize={gameSize} setSelectedSize={setGameSize}/>
            </div>
            <GameStatus currentStatus={gameStatus}/>
            <GameHelp keydownHandler={handleKeyDown}/>
            <Grid cellSize={cellSize} baseGrid={baseGrid} gameGrid={gameGrid}/>
        </div>
    );
}

export default App;
