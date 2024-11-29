import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/ui/Navbar";
import { poppins } from "./ui/fonts";

export const metadata: Metadata = {
  title: "SoulCurate",
  description: "Meet Your Forever After, Handpicked by Real People",
  metadataBase: new URL(
    "https://vercel.com/kareems-projects-e66e9b45/dating-app/Dy6VkKyn1cAXJr2H84wVz4PEL6oC"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <header>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
