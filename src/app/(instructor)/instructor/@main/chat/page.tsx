import SocketProvider from "@/components/providers/SocketProvider";
import ChatInterface from "@/components/user/ChatInterface";

export default function page() {
    return (
        <>
            <SocketProvider>
                <ChatInterface />
            </SocketProvider>
        </>
    )
}
