import { wsurl } from "../../Utils/UtilityFunctions";
export const Wsocket = new WebSocket(wsurl);

Wsocket.onclose = () => {
    console.log("closed");
}