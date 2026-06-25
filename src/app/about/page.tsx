import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Chhab Chhaba Chhab Waterpark Surat",
  description: "Discover the cinematic legacy of Gujarat's premium waterpark. Spanning across lush acres on Hazira Coastal Highway, Surat, we offer international safety standards, German filtration, and thrilling family rides.",
  alternates: {
    canonical: "https://www.chhabchhabachhab.com/about",
  },
  openGraph: {
    title: "About Us | Chhab Chhaba Chhab Waterpark Surat",
    description: "Discover the cinematic legacy of Gujarat's premium waterpark. Spanning across lush acres on Hazira Coastal Highway, Surat, we offer international safety standards, German filtration, and thrilling family rides.",
    url: "https://www.chhabchhabachhab.com/about",
    siteName: "Chhab Chhaba Chhab Waterpark",
    images: [
      {
        url: "https://www.chhabchhabachhab.com/images/slide1.png",
        width: 1200,
        height: 630,
        alt: "Chhab Chhaba Chhab Waterpark Slide View",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Chhab Chhaba Chhab Waterpark Surat",
    description: "Discover the cinematic legacy of Gujarat's premium waterpark. Spanning across lush acres on Hazira Coastal Highway, Surat.",
    images: ["https://www.chhabchhabachhab.com/images/slide1.png"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
