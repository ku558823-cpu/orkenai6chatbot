import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orken AI Chatbot",
  description: "AI chatbot built for Orken AI"
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
