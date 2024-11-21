import { DBSchema, openDB } from "idb";
import { IDBPDatabase } from "idb";
interface IRequestDb extends DBSchema {
  RequestDb: {
    key: number;
    value: {
      rid: number;
      from: string;
      to: string;
      name: string;
      emailId: string;
      profilePicture: string;
      RequestedOn: Date;
    };
    indexes: { fromIndex: string; toIndex: string };
  };
}

export class RequestDbClass {
  private static RequestDb: IDBPDatabase<IRequestDb> | null = null;

  constructor() {}

  public async initDb() {
    if (RequestDbClass.RequestDb === null) {
      RequestDbClass.RequestDb = await openDB<IRequestDb>("RequestDb", 1, {
        upgrade(db) {
          const store = db.createObjectStore("RequestDb", {
            keyPath: "reqId",
            autoIncrement: true,
          });
          store.createIndex("fromIndex", "from", { unique: false });
          store.createIndex("toIndex", "to", { unique: false });
        },
      });
      return RequestDbClass.RequestDb;
    }
    return RequestDbClass.RequestDb;
  }
  public async deleteDb() {
    if (RequestDbClass.RequestDb !== null) {
      const delteobj = RequestDbClass.RequestDb.transaction(
        "RequestDb",
        "readwrite"
      ).objectStore("RequestDb");
      delteobj.clear();

      RequestDbClass.RequestDb = null;
    }
  }
}

export class RequestDBFunctions {
  public async addRequest(request: IRequestDb["RequestDb"]["value"]) {
    const db = new RequestDbClass();
    const requestDb = await db.initDb();
    await requestDb?.put("RequestDb", request);
  }

  public async getRequestByUser(user: string) {
    const dbConn = new RequestDbClass();
    const db = await dbConn.initDb();
    const tx = db.transaction("RequestDb", "readonly").objectStore("RequestDb");
    const result = await tx.index("toIndex").get(user);

    return result;
    // const cursor = await tx.openCursor();
    // const result = new Promise(
    //   (
    //     resolve,
    //     reject
    //   ): null | {
    //     rid: number;
    //     from: string;
    //     to: string;
    //     name: string;
    //     emailId: string;
    //     profilePicture: string;
    //     RequestedOn: string;
    //   } => {
    //     if (cursor === null) {
    //       reject(null);
    //     } else {
    //       if (cursor.value.to === user) {
    //          resolve(cursor.value);
    //       } else {
    //          reject(null);
    //       }
    //     }
    //     reject(null);
    //   }
    // );
    // result.then((value) => { });
  }

  public async getRequestByUserFrom(user: string) {
    const dbConn = new RequestDbClass();
    const db = await dbConn.initDb();
    const tx = db.transaction("RequestDb", "readonly").objectStore("RequestDb");
    const result = await tx.index("fromIndex").get(user);

    return result;
    // const cursor = await tx.openCursor();
    // const result = new Promise(
    //   (
    //     resolve,
    //     reject
    //   ): null | {
    //     rid: number;
    //     from: string;
    //     to: string;
    //     name: string;
    //     emailId: string;
    //     profilePicture: string;
    //     RequestedOn: string;
    //   } => {
    //     if (cursor === null) {
    //       reject(null);
    //     } else {
    //       if (cursor.value.to === user) {
    //          resolve(cursor.value);
    //       } else {
    //          reject(null);
    //       }
    //     }
    //     reject(null);
    //   }
    // );
    // result.then((value) => { });
  }

  public async deleteHandler(user: string) {
    const dbConn = new RequestDbClass();
    const db = await dbConn.initDb();
    const txn = db
      .transaction("RequestDb", "readwrite")
      .objectStore("RequestDb");
    const index = txn.index("toIndex");
    const cursor = await index.openCursor(user);

    if (cursor) {
      await cursor.delete();
    }
    return true;
  }

  public async fromDeleteHandler(user: string) {
    const dbConn = new RequestDbClass();
    const db = await dbConn.initDb();
    const txn = db
      .transaction("RequestDb", "readwrite")
      .objectStore("RequestDb");
    const index = txn.index("fromIndex");
    const cursor = await index.openCursor(user);

    if (cursor) {
      await cursor.delete();
    }
    return true;
  }

  public async getAllRequests() {
    const dbConn = new RequestDbClass();
    const db = await dbConn.initDb();
    const value = await db.getAllFromIndex("RequestDb", "fromIndex");
    return value;
  }

  public async deleteDb() {
    const dbConn = new RequestDbClass();
    await dbConn.initDb();
    await dbConn.deleteDb();
  }

  public async addAll(
    requests: {
      rid: number;
      from: string;
      to: string;
      name: string;
      emailId: string;
      profilePicture: string;
      RequestedOn: Date;
    }[]
  ) {
    const db = new RequestDbClass();
    const requestDb = await db.initDb();
    requests.map(async (request) => {
      await requestDb?.put("RequestDb", request);
    });
  }
}

export const RequestDAO = new RequestDBFunctions();
