"use client";

import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import EventDetails from "@/components/EventDetails";
import Timeline from "@/components/Timeline";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";
import Footer from "@/components/Footer";
import weddingConfig, { type SideConfig, type WeddingSide } from "@/config/wedding";

interface WeddingPageProps {
  side: WeddingSide;
}

export default function WeddingPage({ side }: WeddingPageProps) {
  const sideConfig: SideConfig = weddingConfig.sides[side];

  return (
    <>
      <LoadingScreen />
      <main className="relative">
        <Hero side={sideConfig} />
        <EventDetails side={sideConfig} />
        {side === "nha-trai" && <Timeline side={sideConfig} />}
        <Gallery images={weddingConfig.gallery} />
        <RSVPForm side={side} sideConfig={sideConfig} />
        <Footer />
      </main>
    </>
  );
}
