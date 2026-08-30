import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { AppProvider } from "@/context/AppContext";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "BlogGenius AI - Intelligent Content & Reading Platform",
  description: "AI-Powered blogging microservices engine for next-gen authors and readers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} font-sans dark`}>
      <body className="bg-slate-950 text-slate-100 min-h-screen selection:bg-indigo-500 selection:text-white font-sans antialiased overflow-x-hidden">
        <AppProvider>
          <div className="relative min-h-screen flex flex-col bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
