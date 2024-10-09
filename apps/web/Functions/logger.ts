import winston, { createLogger, Logger } from "winston";
import LokiTransport from "winston-loki";

interface Iinfo {
  Function: string;
    data: string;
    session: string;
}

class loggerClass {
  public static logger: Logger | null = null;

  constructor() {
    if (loggerClass.logger === null) {
      const options = {
        transports: [
          new LokiTransport({
            json: true,
            host: "http://34.67.214.16:3100",
            format: winston.format.json(),
          }),
        ],
      };

      loggerClass.logger = createLogger(options);
    }
  }

  public static logInfo(Function: string, data: any,session:string) {
    if (loggerClass.logger !== null) {
      const log: Iinfo = {
        Function: Function,
          data: data.toString(),
        session:session
      };

      loggerClass.logger.info(log);
    } else {
      console.error("error logging");
    }
  }
}

export default loggerClass;
