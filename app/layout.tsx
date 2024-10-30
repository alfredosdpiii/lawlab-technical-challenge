import "@mantine/core/styles.css";
import React, { ReactNode } from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Navbar from "@/components/nav/navbar";
import Providers from "@/providers/query-provider";

export const metadata = {
  title: "Lawlab Technical Challenge",
  description: "Lawlab Technical Challenge - by Alfredo",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <UserProvider>
        <body>
          <MantineProvider defaultColorScheme="auto">
            <Navbar />
            <Providers>{children}</Providers>
          </MantineProvider>
        </body>
      </UserProvider>
    </html>
  );
}
