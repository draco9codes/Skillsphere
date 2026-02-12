import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client, type IMessage } from "@stomp/stompjs";
import { type RoomMessageDTO } from "@/services/studyRoomService";

interface UseStudyRoomWebSocketProps {
  roomId: number;
  onMessageReceived: (message: RoomMessageDTO) => void;
}

export const useStudyRoomWebSocket = ({
  roomId,
  onMessageReceived,
}: UseStudyRoomWebSocketProps) => {
  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Create WebSocket connection
    const socket = new SockJS("/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket as any,
      debug: (str) => console.log("STOMP:", str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // On successful connection
    stompClient.onConnect = () => {
      console.log("WebSocket connected to room", roomId);
      setIsConnected(true);

      // Subscribe to room messages
      stompClient.subscribe(`/topic/room/${roomId}`, (message: IMessage) => {
        const receivedMessage = JSON.parse(message.body) as RoomMessageDTO;
        onMessageReceived(receivedMessage);
      });
    };

    // On connection error
    stompClient.onStompError = (frame) => {
      console.error("STOMP error:", frame);
      setIsConnected(false);
    };

    // Activate connection
    stompClient.activate();
    clientRef.current = stompClient;

    // Cleanup on unmount
    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [roomId]);

  const sendMessage = (message: RoomMessageDTO) => {
    if (clientRef.current && isConnected) {
      clientRef.current.publish({
        destination: `/app/room/${roomId}/message`,
        body: JSON.stringify(message),
      });
    }
  };

  return { isConnected, sendMessage };
};
