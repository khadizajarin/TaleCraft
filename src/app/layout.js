import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "../lib/AuthProvider";


export const metadata = {
  title: "TaleCraft",
  description: "Where Pens Converge",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
      <body>
        {children}
      </body>
    </html>
    </AuthProvider>
    
  );
}
