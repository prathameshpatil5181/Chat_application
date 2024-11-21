

class OnOpenHandlerClass{

    public static async RequestUpdate() {
        // ask for the request updates
        
        const msg = {
            type: "REQUEST",
            channel: "REQUESTUPDATE",
            lastupdated: new Date()
        }

    }


}


export const OnOpenHandler = new OnOpenHandlerClass();