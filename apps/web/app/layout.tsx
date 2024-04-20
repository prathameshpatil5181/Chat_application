"use client";

import "./globals.css";

import { Provider } from "react-redux";
import Store from "../Store/Store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {

  return (
    <html lang="en">
      <Provider store={Store}>
        <body className="w-screen h-screen overflow-x-hidden relative">
          {children}
        </body>
      </Provider>

    </html>
  );
}
