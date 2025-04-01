import {io} from "socket.io-client";
import {BASE_URL} from "./Constants";
export const createSocketConnection = () => {
    // base_url is backend url here, connecting with server
    if(location.host === 'localhost'){
        return io(BASE_URL);
    }
    else {
        return io("/", {path: "api/socket.io"});
    }
}