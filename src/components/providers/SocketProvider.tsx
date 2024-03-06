"use client";
import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_SERVICE } from "@/utils/constants";

interface InitialContextType {
    socket: Socket;
}
export const SocketContext = createContext<InitialContextType>({ socket: io(SOCKET_SERVICE) });

export default function SocketProvider({ children }: { children: React.ReactNode }) {

    const socket: Socket = io(SOCKET_SERVICE);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}
