import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import envParse from "@/utils/env";

export const metadata: Metadata = {
  title: "Exam portal",
  description: "make your exams easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  envParse();
  return (
    <html lang="en">
      <body className="text-gray-800 scroll-smooth bg-gray-50">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
