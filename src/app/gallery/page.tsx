import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Photo & Video Gallery | Chhab Chhaba Chhab Waterpark",
  description: "Take a visual journey through Chhab Chhaba Chhab Waterpark in Surat. View high-definition pictures of massive slides, cinematic sunset wave simulator pools, tropical rivers, and happy guest reviews.",
  alternates: {
    canonical: "https://www.chhabchhabachhab.com/gallery",
  },
  openGraph: {
    title: "Photo & Video Gallery | Chhab Chhaba Chhab Waterpark",
    description: "Take a visual journey through Chhab Chhaba Chhab Waterpark in Surat. View high-definition pictures of massive slides, cinematic sunset wave simulator pools, tropical rivers, and happy guest reviews.",
    url: "https://www.chhabchhabachhab.com/gallery",
    siteName: "Chhab Chhaba Chhab Waterpark",
    images: [
      {
        url: "https://www.chhabchhabachhab.com/images/slide1.png",
        width: 1200,
        height: 630,
        alt: "Chhab Chhaba Chhab Waterpark Joyful Rides",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo & Video Gallery | Chhab Chhaba Chhab Waterpark",
    description: "Take a visual journey through Chhab Chhaba Chhab Waterpark in Surat.",
    images: ["https://www.chhabchhabachhab.com/images/slide1.png"],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
