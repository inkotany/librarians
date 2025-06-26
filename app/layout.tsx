import type { Metadata } from "next";
import "./globals.css";
import { APP_NAME } from "./constants";
import { ThemeProvider } from "./_components/ThemesProvider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "./QueryClient";

export const metadata: Metadata = {
  title: `Librarians | ${APP_NAME}`,
  description: "The place for librarians to manage their libraries, members, books  and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        <main>
          <SessionProvider>
            <ReactQueryProvider>
              <Toaster position="top-center" />
              <ThemeProvider>{children}</ThemeProvider>
            </ReactQueryProvider>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
