import React, {useEffect, useState} from 'react';
import './App.css';
import {beHost, createServer, getServer} from './Server';
import {ServerHost} from "./components/ServerHost";

enum GameStatus {
  RoundSelect = "round-select",
  Playing = "playing",
  GameOver = "game-over"
}

interface Point {
    x: number,
    y: number,
    z: number,
    value: number
}

const sizeContainer = [2,3,4];

const gameHelp = "Use q, w, e, a, s, d keys for move";

function App() {
    const [hostAddress, setAddress] = useState(beHost);
    const [grid, changeGrid] = useState<Point[]>([]);

    const buttons = sizeContainer.map((x) => {
        return <button value='Value'>{x}</button>
    });

    const gridElements = grid.map(point =>{
        let coords = `${point.x.toString()};${point.y.toString()};${point.z.toString()}`;
        console.log(coords);
        console.log(point);
        return <li key={coords}>{point.value}</li>;
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
            {gridElements}
            <div>Gaming status: {GameStatus.RoundSelect}</div>
            <div>{gameHelp}</div>
        </div>
    );
}

export default App;
