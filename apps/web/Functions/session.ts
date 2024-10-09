"use client";
import { v4 } from "uuid";
// import loggerClass from "./logger";

export let session: string | null = "";

export const sessionHandler = () => {
    if (typeof window !== "undefined" && sessionStorage) {
      // Attempt to retrieve the session ID
      session = sessionStorage.getItem("sessionId");

      if (session === null) {
        // Generate a new session ID if none exists
        session = v4();
        sessionStorage.setItem("sessionId", session);
        console.log("Client connected: " + session);
        // loggerClass.logInfo("sessionHandler", `Client connected: ${session}`, session);
      } else {
        console.log("Client connected: " + session);
        // loggerClass.logInfo("sessionHandler", `Client connected: ${session}`, session);
      }
    } else {
      console.error("sessionStorage is not available.");
    }
};
