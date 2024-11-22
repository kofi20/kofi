import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Isadru Santos",
    default: "Isadru Santos",
  },
  description: "This is my portifolio website with a custom AI chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main className="mx-auto max-w-3xl  px-3 py-10">
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </main>
      </body>
    </html>
  );
}
