import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "O.V.A WebvicTech QWEN3",
  description:
    " O.V.A WebvicTech INT SERVICE LIMITED is a digital solutions company specializing in building modern, user-friendly websites and mobile applications. Our focus is on creating fast, secure, and scalable products that help businesses connect with their customers and grow online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors closeButton visibleToasts={5} expand={true} />
      </body>
    </html>
  );
}
