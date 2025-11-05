import type { Metadata } from "next";
import { Heebo, Inter } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin-ext"],
  variable: "--font-heebo",
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "pogodin.co.il",
  description: "Front-end design portfolio by Pogodin.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
