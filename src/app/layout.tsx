import type { Metadata } from "next";
import {
  Caveat,
  Cinzel,
  Geist_Mono,
  Montserrat,
  Plus_Jakarta_Sans,
  Sora,
} from "next/font/google";
import { LenisProvider } from "@/components/lenis-provider";
import { ChatbotWidget } from "@/components/chatbot-widget";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sri Chaitanya Schools",
  description: "Sri Chaitanya Schools homepage",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${geistMono.variable} ${cinzel.variable} ${sora.variable} ${plusJakartaSans.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider />
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
