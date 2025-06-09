import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WEB MAGIC BY CARTER - Portfolio",
  description: "A portfolio showcasing my skills and projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css" />
        <link rel="stylesheet" href="/css/custom-bulma.css" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="is-flex-grow-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
