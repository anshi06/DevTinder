import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
    return io(BASE_URL) //Only work in dev not on production
}