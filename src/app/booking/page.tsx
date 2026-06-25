import type { Metadata } from "next";
import BookingClient from "./BookingClient";

export const metadata: Metadata = {
  title: "Book Tickets Online | Chhab Chhaba Chhab Waterpark",
  description: "Reserve your adventure passes for Chhab Chhaba Chhab Waterpark online. Bypass the entry queue and choose from Silver, Gold, or VIP Express entry tiers.",
  alternates: {
    canonical: "https://www.chhabchhabachhab.com/booking",
  },
  openGraph: {
    title: "Book Tickets Online | Chhab Chhaba Chhab Waterpark",
    description: "Reserve your adventure passes for Chhab Chhaba Chhab Waterpark online. Bypass the entry queue and choose from Silver, Gold, or VIP Express entry tiers.",
    url: "https://www.chhabchhabachhab.com/booking",
    siteName: "Chhab Chhaba Chhab Waterpark",
    images: [
      {
        url: "https://www.chhabchhabachhab.com/images/slide3.png",
        width: 1200,
        height: 630,
        alt: "Chhab Chhaba Chhab Adventure Booking",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Tickets Online | Chhab Chhaba Chhab Waterpark",
    description: "Reserve your adventure passes for Chhab Chhaba Chhab Waterpark online. Bypass the entry queue.",
    images: ["https://www.chhabchhabachhab.com/images/slide3.png"],
  },
};

export default function BookingPage() {
  return <BookingClient />;
}
