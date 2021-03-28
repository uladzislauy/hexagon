import React, {useEffect, useState} from 'react';
import './App.css';
import {beHost, createGameApiConnector, getGameApiConnector} from './utils/GameApiConnector';
import {ServerHost} from "./components/ServerHost";
import {BaseGrid, CellSize, Point} from "./types";
import {Grid} from "./components/Grid/Grid";
import {GameStatus} from "./components/GameStatus";
import {GameSizeSelector} from "./components/GameSizeSelector";
import {keydownHandler} from "./helpers/KeyboardHandler";
import {GameHelp} from "./components/GameHelp";
import {DefaultGameSize, GameStatuses, LayoutWidth} from "./consts";
import {
    buildBaseGrid,
    calculateCellCornerPoints,
    calculateCellRadius,
    calculateCellSizeByRadius
} from "./utils/GridCalculations";

function App(): JSX.Element {
    const [hostAddress, setAddress] = useState(beHost);
    const [grid, changeGrid] = useState<Point[]>([]);
    const [gameStatus, changeGameStatus] = useState<GameStatuses>(GameStatuses.RoundSelect);
    const [gameSize, setGameSize] = useState(DefaultGameSize);
    const [gameGrid, setGameGrid] = useState<BaseGrid>([]);
    const [cellSize, setCellSize] = useState<CellSize>({width: 0, height: 0});

    window.addEventListener("keydown", keydownHandler);

    useEffect(() => {
        createGameApiConnector(hostAddress);
    }, [hostAddress]);

    useEffect(() => {
        fetchData(`/${gameSize}`);

        async function fetchData(url: string) {
            const gameApiConnector = getGameApiConnector();
            try {
                const response = await gameApiConnector.post<Point[]>(url, []);
                changeGrid(response.data);
            } catch (e) {
                console.log(e);
            }
        }
    }, [gameSize]);

    useEffect(() => {
        const cellRadius = calculateCellRadius(LayoutWidth, gameSize);
        const cellSize = calculateCellSizeByRadius(cellRadius);
        const cellCorners = calculateCellCornerPoints(cellSize, cellRadius);

        const baseGrid = buildBaseGrid(gameSize, cellRadius, cellCorners);

        setCellSize(cellSize);
        changeGameStatus(GameStatuses.Playing);
        setGameGrid(baseGrid);
    }, [gameSize]);

    return (
        <div className="App">
            <div>
                <div>Game server url</div>
                <ServerHost serverHost={hostAddress} setServerHost={setAddress}/>
                <GameSizeSelector selectedSize={gameSize} setSelectedSize={setGameSize}/>
            </div>
            <Grid cellSize={cellSize} baseGrid={gameGrid}/>
            <GameStatus currentStatus={gameStatus}/>
            <GameHelp/>
        </div>
    );
}

export default App;
