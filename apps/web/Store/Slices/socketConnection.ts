import { wsurl } from "../../Utils/UtilityFunctions";

export const Wsocket = new WebSocket(wsurl);


Wsocket.onclose = () => {
    console.log("closed");
}

// Wsocket.onopen = () => {
//     console.log("opened");
//         const msg = {
//           channel: "REQUEST",
//           type: "REQUESTUPDATE",
//           from: '',
//         };
//   ConnectionRequestHandler.getRequestUpdate(msg);
//       console.log("opened called");
// }