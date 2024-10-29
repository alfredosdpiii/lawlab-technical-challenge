import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import NavbarWrapper from "@/components/nav/navbar-wrapper";

export const metadata = {
  title: "Lawlab Technical Challenge",
  description: "Lawlab Technical Challenge - by Alfredo",
};

export default function RootLayout({ children }: { children: any }) {
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
      <body>
        <MantineProvider defaultColorScheme="auto">
          <NavbarWrapper />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
