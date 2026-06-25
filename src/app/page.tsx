import type { Metadata } from "next";
import Loader from "@/components/Loader/Loader";
import SmoothScroll from "@/components/ScrollAnimations/SmoothScroll";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Attractions from "@/components/Attractions/Attractions";
import Splash from "@/components/Splash/Splash";
import WavePool from "@/components/WavePool/WavePool";
import Gallery from "@/components/Gallery/Gallery";
import Facilities from "@/components/Facilities/Facilities";
import Booking from "@/components/Booking/Booking";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Chhab Chhaba Chhab Waterpark | Premium Water Park Experience Surat",
  description: "Dive into Gujarat's largest and most premium waterpark. Experience massive slides, wave simulator pools, luxury amenities, and beautiful moments at Hazira Coastal Highway, Surat.",
  alternates: {
    canonical: "https://www.chhabchhabachhab.com",
  },
  openGraph: {
    title: "Chhab Chhaba Chhab Waterpark | Premium Water Park Experience Surat",
    description: "Dive into Gujarat's largest and most premium waterpark. Experience massive slides, wave simulator pools, luxury amenities, and beautiful moments at Hazira Coastal Highway, Surat.",
    url: "https://www.chhabchhabachhab.com",
    siteName: "Chhab Chhaba Chhab Waterpark",
    images: [
      {
        url: "https://www.chhabchhabachhab.com/images/slide1.png",
        width: 1200,
        height: 630,
        alt: "Chhab Chhaba Chhab Waterpark Aerial View",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chhab Chhaba Chhab Waterpark | Premium Water Park Experience Surat",
    description: "Dive into Gujarat's largest and most premium waterpark. Experience massive slides, wave pools, and luxury amenities.",
    images: ["https://www.chhabchhabachhab.com/images/slide1.png"],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AmusementPark",
    "name": "Chhab Chhaba Chhab Water Park",
    "description": "Premium water theme park in Surat, Gujarat featuring high-speed water slides, wave simulator pools, tropical rivers, and luxury amenities.",
    "url": "https://www.chhabchhabachhab.com",
    "image": "https://www.chhabchhabachhab.com/images/slide1.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hazira Coastal Highway",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "postalCode": "394270",
      "addressCountry": "IN"
    },
    "telephone": "+919876543210",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "10:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "₹₹"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Loader />
      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Attractions />
          <Splash />
          <WavePool />
          <Gallery />
          <Facilities />
          <Booking />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
