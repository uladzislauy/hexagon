import React from "react";
import {BeHost} from "../consts";

interface ServerHostProps {
    setServerHost: (serverAddress: string) => void;
}

export const ServerHost: React.FC<ServerHostProps> = ({setServerHost}) => {
    const onChange = (evt: React.FormEvent<HTMLSelectElement>) => {
        console.log("current host: " + evt.currentTarget.value);
        setServerHost(evt.currentTarget.value);
    }

    return <select id="url-server" onChange={onChange}>
        <option id="remote" value={BeHost}>Remote server</option>
        <option id="localhost" value="http://localhost:13337/">Local server</option>
    </select>
};
