
import Reduxprovider from "./Reduxprovider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }): JSX.Element {
    //save the session
    // sessionHandler();

    return (
      <html lang="en">
          <body className="w-screen h-screen overflow-x-hidden relative">
        <Reduxprovider>
            {children}
        </Reduxprovider>  
          </body>
      </html>
    );
  }
