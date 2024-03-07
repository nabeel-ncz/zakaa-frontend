"use client";
import { useContext, useEffect } from "react";
import { SocketContext } from "./SocketProvider";
import { useDispatch } from "react-redux";
import { TypeDispatch } from "@/store";
import { fetchUserAction } from "@/store/actions";

export default function HandleUserLeaving() {

    const { socket } = useContext(SocketContext);
    const dispatch: TypeDispatch = useDispatch();

    useEffect(() => {
        const handler = async () => {
            const res = await dispatch(fetchUserAction());
            if (!res.payload?.success) return;

            socket.emit("offline", {
                user: res.payload?.data?._id
            });
        }

        window.addEventListener('beforeunload', handler);
        return () => {
            window.removeEventListener('beforeunload', handler);
        };
    }, []);

    return (
        <></>
    )
}
