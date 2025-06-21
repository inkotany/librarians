import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { APP_NAME } from "./constants";
import { ThemeProvider } from "./_components/ThemesProvider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          <SessionProvider>
            <Toaster position="top-center" />
            <ThemeProvider>{children}</ThemeProvider>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
