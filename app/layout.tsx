import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const  kyivType = localFont({
  src: "./fonts/KyivTypeTitling-Bold.otf",
  weight: "100 900",
  variable: "--font-kyivtype"
})

export const metadata: Metadata = {
  title: "Topdoc",
  description: "Topdoc official site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${kyivType.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
