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
import {
    arePointsInArraysEqual,
    calculatePointsOnDirection,
    gameOver,
    getUpdatedGameGrid
} from "./utils/GameCalculations";
import {getDirectionByKey} from "./helpers/KeyboardHandler";

function App(): JSX.Element {
    const [hostAddress, setAddress] = useState(BeHost);
    const [gameStatus, changeGameStatus] = useState<GameStatuses>(GameStatuses.RoundSelect);
    const [gameSize, setGameSize] = useState(DefaultGameSize);
    const [cellSize, setCellSize] = useState<CellSize>({width: 0, height: 0});
    const [score, setScore] = useState(0);

    const [baseGameGrid, setBaseGameGrid] = useState<BaseGrid>([]);
    const [gameGrid, setGameGrid] = useState<FilledGrid>(new Map());
    const baseGrid: FilledGrid = new Map(baseGameGrid.map((cell, index) => [index, cell]));
    const [serverPoints, setServerPoints] = useState<Point[]>([]);

    // initial parsing of hashed game size
    useEffect(() => {
        const urlGameConfig = location.hash.match(/\d+/);
        const matchResult = (urlGameConfig) ? urlGameConfig[0].toString() : DefaultGameSize.toString();
        const urlGameSize = Number.parseInt(matchResult);
        setGameSize(urlGameSize);
    }, [window.location]);

    // initial creation of API connector
    useEffect(() => createGameApiConnector(hostAddress), [hostAddress]);

    // initial data fetching
    useEffect(() => {
        if (gameSize === 0) return;

        setTimeout(() => fetchData(`/${gameSize}`), 50);

        async function fetchData(url: string) {
            try {
                const response = await getGameApiConnector().post<Point[]>(url, []);
                setServerPoints(response.data);
            } catch (e) {
                console.log(e);
            }
        }
    }, [gameSize, hostAddress]);

    // updating grids
    useEffect(() => {
        if (gameSize === 0) return;

        const cellRadius = calculateCellRadius(LayoutWidth, gameSize);
        const cellSize = calculateCellSizeByRadius(cellRadius);
        const cellCorners = calculateCellCornerPoints(cellSize, cellRadius);
        setCellSize(cellSize);

        const baseGrid = buildBaseGrid(gameSize, cellRadius, cellCorners);
        const updatedGameGrid = getUpdatedGameGrid(serverPoints, baseGrid, new Map());
        setBaseGameGrid(baseGrid);
        setGameGrid(updatedGameGrid);
    }, [serverPoints, gameSize])

    //game status
    useEffect(() => {
        if (serverPoints.length === 0) changeGameStatus(GameStatuses.RoundSelect);
        else if (gameOver(serverPoints, gameSize)) changeGameStatus(GameStatuses.GameOver);
        else changeGameStatus(GameStatuses.Playing);
    }, [serverPoints]);

    // keyboard buttons pressing handler
    const handleKeyDown = useCallback((evt: KeyboardEvent) => {
        if (serverPoints.length === 0) return;

        const direction = getDirectionByKey(evt.code);
        if (!direction) return;

        const newPointsCalculations = calculatePointsOnDirection(direction, serverPoints, gameSize);

        const newPoints = newPointsCalculations[0];
        setScore(score + newPointsCalculations[1]);

        if (arePointsInArraysEqual(newPoints, serverPoints)) return;

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
            <GameHelp keydownHandler={handleKeyDown}/>
            <br/>
            <GameStatus currentStatus={gameStatus} score={score}/>
            <Grid cellSize={cellSize} baseGrid={baseGrid} gameGrid={gameGrid}/>
        </div>
    );
}

export default App;
