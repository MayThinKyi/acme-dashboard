import type { Metadata } from "next";
import { Inter, Lusitana } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar";
import AppQueryProvider from "./providers/AppQueryProvider";

const inter = Inter({ subsets: ["latin"] });
const lusitana = Lusitana({ subsets: ["latin"], weight: ["400", '700'] });

export const metadata: Metadata = {
  title: "Acme Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <AppQueryProvider>
          <main className="flex flex-wrap md:flex-nowrap">
            <div className="w-full md:w-[20%]">
              <Navbar />
            </div>
            <div className="px-5 w-full md:w-[80%]">
              {children}
            </div>
          </main>
        </AppQueryProvider>
      </body>
    </html>
  );
}