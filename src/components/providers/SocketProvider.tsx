"use client";
import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_SERVICE } from "@/utils/constants";

interface InitialContextType {
    socket: Socket;
    // ws: Socket;
}
const socket: Socket = io(SOCKET_SERVICE, { transports: ['websocket'] });
// const ws: Socket = io(SOCKET_SERVICE, { transports: ['websocket'] });
export const SocketContext = createContext<InitialContextType>({ socket });

export default function SocketProvider({ children }: { children: React.ReactNode }) {
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}
