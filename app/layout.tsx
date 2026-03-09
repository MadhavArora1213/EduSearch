import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "EduSearch | India's #1 College Search & Admission Portal",
  description: "Find your dream college and course in India. Explore 35,000+ top universities, MBA, Engineering, and Medical colleges with expert counseling, fee details, and placement records.",
  keywords: "college search, admissions 2026, top universities India, MBA entrance exams, engineering colleges, medical admission guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
