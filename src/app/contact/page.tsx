import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Chhab Chhaba Chhab Waterpark Surat",
  description: "Get in touch with the Chhab Chhaba Chhab Waterpark support desk. Find our location on Hazira Coastal Highway in Surat, working hours, phone numbers, and submit group booking inquiries.",
  alternates: {
    canonical: "https://www.chhabchhabachhab.com/contact",
  },
  openGraph: {
    title: "Contact Us | Chhab Chhaba Chhab Waterpark Surat",
    description: "Get in touch with the Chhab Chhaba Chhab Waterpark support desk. Find our location on Hazira Coastal Highway in Surat, working hours, phone numbers, and submit group booking inquiries.",
    url: "https://www.chhabchhabachhab.com/contact",
    siteName: "Chhab Chhaba Chhab Waterpark",
    images: [
      {
        url: "https://www.chhabchhabachhab.com/images/slide4.png",
        width: 1200,
        height: 630,
        alt: "Contact Chhab Chhaba Chhab Support",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Chhab Chhaba Chhab Waterpark Surat",
    description: "Get in touch with the Chhab Chhaba Chhab Waterpark support desk on Hazira Coastal Highway in Surat.",
    images: ["https://www.chhabchhabachhab.com/images/slide4.png"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
