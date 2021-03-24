import React from "react";

interface ServerHostProps {
    serverHost: string;
    setServerHost: (serverAddress: string) => void;
}

export const ServerHost: React.FC<ServerHostProps> = ({serverHost, setServerHost}) => {
    const onChange = (evt: React.FormEvent<HTMLInputElement>) => {
        setServerHost(evt.currentTarget.value);
    }

    return <input type="text" value={serverHost} onChange={onChange}></input>
};
