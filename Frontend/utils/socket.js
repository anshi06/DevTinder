import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL); //Only work in dev not on production
  }
  return io("/", { path: "/api/socket.io" }); //Our backend is running at /api & on prod we need to configure the path
};
