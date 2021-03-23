import React, {useEffect, useState} from 'react';
import './App.css';
import {beHost, createServer, getServer} from './Server';
import {ServerHost} from "./components/ServerHost";
import {Point} from "./types";
import {Grid} from "./components/Grid";
import {GameStatus} from "./components/GameStatus";

const sizeContainer = [2,3,4];

const gameHelp = "Use q, w, e, a, s, d keys for move";

function App() {
    const [hostAddress, setAddress] = useState(beHost);
    const [grid, changeGrid] = useState<Point[]>([]);

    const buttons = sizeContainer.map((x) => {
        return <button value='Value'>{x}</button>
    });

    useEffect(() => {
        fetchData('/2');

        async function fetchData(url: string){
            let gameApiConnector = getServer();
            let response = await gameApiConnector.post<Point[]>(url, []);
            changeGrid(response.data);
        }
    }, [hostAddress]);

    const createNewServer = () => {
        createServer(hostAddress);
    };

    createNewServer();

    return (
        <div className="App">
            <div>
                <div>RNG-server url</div>
                <ServerHost serverHost={hostAddress} setServerHost={setAddress}/>
                <div>Select radius: {buttons}</div>
            </div>
            <Grid currentGrid={grid}></Grid>
            <GameStatus/>
            <div>{gameHelp}</div>
        </div>
    );
}

export default App;
