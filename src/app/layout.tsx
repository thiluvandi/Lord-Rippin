import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lord Rippin' — Premium Streetwear",
  description:
    "Independent clothing label. Premium heavyweight streetwear. T-shirts crafted from 240 GSM cotton.",
  openGraph: {
    title: "Lord Rippin' — Premium Streetwear",
    description:
      "Independent clothing label. Premium heavyweight streetwear.",
    type: "website",
    locale: "en",
    siteName: "Lord Rippin'",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lord Rippin' — Premium Streetwear",
    description:
      "Independent clothing label. Premium heavyweight streetwear.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-foreground">
        <StoreProvider>
          <Header />
          <MobileMenu />
          <SearchOverlay />
          <CartDrawer />
          <main className="flex-1 pt-[72px]">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
