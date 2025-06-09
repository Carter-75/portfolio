import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bulma/css/bulma.min.css";
import "/public/css/custom-bulma.css";
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
