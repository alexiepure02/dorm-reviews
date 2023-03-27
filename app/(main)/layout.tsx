"use client";

import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider basePath="/api/auth">
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
