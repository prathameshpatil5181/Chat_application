import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function
export function middleware(request: NextRequest) {
  // Get the cookie named 'authToken' (or your session token)
  const authToken = request.cookies.get("token");

  // Check if the user is not logged in (authToken is absent)
  if (!authToken) {
    // If the user is not logged in and trying to access a protected route
 
      console.log("User not logged in. Redirecting to login page...");
      // Redirect the user to the login page
      return NextResponse.redirect(new URL("/login", request.url));
    
  } 
  // If the user is authenticated or on the login page, allow the request to proceed
  return NextResponse.next();
}

// Specify the routes where the middleware should apply
export const config = {
  matcher: ["/"], // Add your protected routes here
};
