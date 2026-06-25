import type { Metadata } from "next";
import FacilitiesClient from "./FacilitiesClient";

export const metadata: Metadata = {
  title: "Premium Park Facilities | Chhab Chhaba Chhab Waterpark",
  description: "Learn about the world-class guest facilities at Chhab Chhaba Chhab Waterpark in Surat. Features RFID smart lockers, multi-level secure parking, multi-cuisine dining, hygiene CHANGING SUITES, and high-tech first aid stations.",
  alternates: {
    canonical: "https://www.chhabchhabachhab.com/facilities",
  },
  openGraph: {
    title: "Premium Park Facilities | Chhab Chhaba Chhab Waterpark",
    description: "Learn about the world-class guest facilities at Chhab Chhaba Chhab Waterpark in Surat. Features RFID smart lockers, multi-level secure parking, multi-cuisine dining, hygiene CHANGING SUITES, and high-tech first aid stations.",
    url: "https://www.chhabchhabachhab.com/facilities",
    siteName: "Chhab Chhaba Chhab Waterpark",
    images: [
      {
        url: "https://www.chhabchhabachhab.com/images/slide4.png",
        width: 1200,
        height: 630,
        alt: "Chhab Chhaba Chhab Waterpark Facilities",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Park Facilities | Chhab Chhaba Chhab Waterpark",
    description: "Learn about the world-class guest facilities at Chhab Chhaba Chhab Waterpark in Surat.",
    images: ["https://www.chhabchhabachhab.com/images/slide4.png"],
  },
};

export default function FacilitiesPage() {
  return <FacilitiesClient />;
}
