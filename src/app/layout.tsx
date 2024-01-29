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
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
