import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://admissionseason.com"),
  title: "Admission Season | India's #1 College Search & Admission Portal",
  description: "Find your dream college and course in India with Admission Season. Explore 35,000+ top universities, MBA, Engineering, and Medical colleges with expert counseling, fee details, and placement records.",
  keywords: "college search, admissions 2026, Admission Season, top universities India, MBA entrance exams, engineering colleges, medical admission guide",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Admission Season | College Search & Admission Portal",
    description: "Explore 35,000+ colleges and find your perfect course with Admission Season.",
    url: "https://admissionseason.com",
    siteName: "Admission Season",
    locale: "en_IN",
    type: "website",
  },
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
