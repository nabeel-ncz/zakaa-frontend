"use client";
import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_SERVICE } from "@/utils/constants";

interface InitialContextType {
    socket: Socket;
}
const socket: Socket = io(SOCKET_SERVICE);
export const SocketContext = createContext<InitialContextType>({ socket });

export default function SocketProvider({ children }: { children: React.ReactNode }) {
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}
