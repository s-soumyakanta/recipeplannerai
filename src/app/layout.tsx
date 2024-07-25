import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { connectDB } from "@/lib/mongo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RecipePlannerAI | AI-Powered Recipe Assistant",
  description: "Discover personalized recipes with RecipePlannerAI, your AI-powered cooking companion. Get tailored meal suggestions based on your preferences, dietary needs, and available ingredients.",
  keywords: "AI recipe assistant, personalized recipes, cooking app, meal planner, dietary recommendations",
  authors: [{ name: "S Soumyakanta" }],
  creator: "S Soumyakanta",
  publisher: "RecipePlannerAI",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "RecipePlannerAI | AI-Powered Recipe Assistant",
    description: "Your personal AI chef for tailored recipes and meal planning",
    url: "https://cookbuddy.vercel.app", // Update this URL to your actual website
    siteName: "RecipePlannerAI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "RecipePlannerAI | AI-Powered Recipe Assistant",
    description: "Discover personalized recipes with RecipePlannerAI, your AI cooking companion",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 await connectDB();

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
