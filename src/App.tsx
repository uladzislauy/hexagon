import React, {useEffect, useState} from 'react';
import './App.css';
import {beHost, createServer, getServer} from './Server';
import {ServerHost} from "./components/ServerHost";
import {DefaultGameSize, GameStatuses, Point} from "./types";
import {Grid} from "./components/Grid";
import {GameStatus} from "./components/GameStatus";
import {GameSizeSelector} from "./components/GameSizeSelector";

const gameHelp = "Use q, w, e, a, s, d keys for move";

function App() {
    const [hostAddress, setAddress] = useState(beHost);
    const [grid, changeGrid] = useState<Point[]>([]);
    const [gameStatus, changeGameStatus] = useState<keyof typeof GameStatuses>("RoundSelect");
    const [gameSize, setGameSize] = useState(DefaultGameSize);

    useEffect(() => {
        fetchData(`/${gameSize}`);

        async function fetchData(url: string){
            let gameApiConnector = getServer();
            let response = await gameApiConnector.post<Point[]>(url, []);
            changeGrid(response.data);
        }
    }, [hostAddress, gameSize]);

    const createNewServer = () => {
        createServer(hostAddress);
    };

    createNewServer();

    return (
        <div className="App">
            <div>
                <div>RNG-server url</div>
                <ServerHost serverHost={hostAddress} setServerHost={setAddress}/>
                <GameSizeSelector selectedSize={gameSize} setSelectedSize={setGameSize}/>
            </div>
            <Grid currentGrid={grid}></Grid>
            <GameStatus currentStatus={gameStatus}/>
            <div>{gameHelp}</div>
        </div>
    );
}

export default App;
