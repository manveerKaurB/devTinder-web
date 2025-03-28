import {io} from "socket.io-client";
import {BASE_URL} from "./Constants";
export const createSocketConnection = () => {
    // base_url is backend url here, connecting with server
    return io(BASE_URL);
}