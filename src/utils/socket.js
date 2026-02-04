import { io } from "socket.io-client";
import { API_URL } from "./constants";

export const createSocketConnection = () => {
    return io(API_URL, {
        auth: {
            token: localStorage.getItem("token")
        }
    });
};

