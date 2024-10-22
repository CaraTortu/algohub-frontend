import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "./_components/ui/theme-provider";

export const metadata: Metadata = {
    title: "AlgoHub",
    description: "Your aid in college work",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    disableTransitionOnChange={true}
                >
                    <TRPCReactProvider>
                        {children}
                    </TRPCReactProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
