import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Occupational Fitness Demo",
  description: "Beneficiary → required forms → lab tests, per the NCOSH occupational fitness regulation.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
