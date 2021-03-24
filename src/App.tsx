import React, {useEffect, useState} from 'react';
import './App.css';
import {beHost, createGameApiConnector, getGameApiConnector} from './GameApiConnector';
import {ServerHost} from "./components/ServerHost";
import {Point} from "./types";
import {Grid} from "./components/Grid";
import {GameStatus} from "./components/GameStatus";
import {GameSizeSelector} from "./components/GameSizeSelector";
import {keydownHandler} from "./helpers/KeyboardHandler";
import {GameHelp} from "./components/GameHelp";
import {DefaultGameSize, GameStatuses} from "./consts";

function App() {
    const [hostAddress, setAddress] = useState(beHost);
    const [grid, changeGrid] = useState<Point[]>([]);
    const [gameStatus, changeGameStatus] = useState<keyof typeof GameStatuses>("RoundSelect");
    const [gameSize, setGameSize] = useState(DefaultGameSize);

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
            }
            catch (e){
                console.log(e);
            }
        }
    }, [gameSize]);

    return (
        <div className="App">
            <div>
                <div>Game server url</div>
                <ServerHost serverHost={hostAddress} setServerHost={setAddress}/>
                <GameSizeSelector selectedSize={gameSize} setSelectedSize={setGameSize}/>
            </div>
            <Grid currentGrid={grid}></Grid>
            <GameStatus currentStatus={gameStatus}/>
            <GameHelp/>
        </div>
    );
}

export default App;
