import React, {CSSProperties} from "react";
import {BeHost} from "../consts";

interface ServerHostProps {
    setServerHost: (serverAddress: string) => void;
}

export const ServerHost: React.FC<ServerHostProps> = ({setServerHost}) => {
    const style: CSSProperties = {
        padding: "3px",
        margin: "5px"
    }

    const onChange = (evt: React.FormEvent<HTMLSelectElement>) => {
        setServerHost(evt.currentTarget.value);
    }

    return <select id="url-server" onChange={onChange} style={style}>
        <option id="remote" value={BeHost}>Remote server</option>
        <option id="localhost" value="http://localhost:13337/">Local server</option>
    </select>
};
