import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Хөмөг Майнинг ХХК | Mining • Maintenance • Training",
  description:
    "Уул уурхайн хүнд техник, олборлолт, ХАБЭА, сургалтын цогц үйлчилгээ.",
  keywords: [
    "уул уурхайн сургалт",
    "хүнд машин механизм",
    "ХАБЭА",
    "mining training mongolia",
    "mining maintenance",
    "уул уурхайн зөвлөгөө",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
