import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Config from "@/components/Config";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Toaster />
        <Config />
        {children}
      </body>
    </html>
  );
}
