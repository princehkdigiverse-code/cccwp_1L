import type { Metadata } from "next";
import AttractionsClient from "./AttractionsClient";

export const metadata: Metadata = {
  title: "Water Slides & Attractions | Chhab Chhaba Chhab Waterpark",
  description: "Explore Gujarat's ultimate collection of water slides, wave simulator pools, lazy rivers, and splash zones. Discover adrenaline-packed vertical drops like the Kamikaze and family play areas.",
  alternates: {
    canonical: "https://www.chhabchhabachhab.com/attractions",
  },
  openGraph: {
    title: "Water Slides & Attractions | Chhab Chhaba Chhab Waterpark",
    description: "Explore Gujarat's ultimate collection of water slides, wave simulator pools, lazy rivers, and splash zones. Discover adrenaline-packed vertical drops like the Kamikaze and family play areas.",
    url: "https://www.chhabchhabachhab.com/attractions",
    siteName: "Chhab Chhaba Chhab Waterpark",
    images: [
      {
        url: "https://www.chhabchhabachhab.com/images/slide2.png",
        width: 1200,
        height: 630,
        alt: "Cyclone Funnel Water Slide",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Water Slides & Attractions | Chhab Chhaba Chhab Waterpark",
    description: "Explore Gujarat's ultimate collection of water slides, wave simulator pools, lazy rivers, and splash zones.",
    images: ["https://www.chhabchhabachhab.com/images/slide2.png"],
  },
};

export default function AttractionsPage() {
  return <AttractionsClient />;
}
