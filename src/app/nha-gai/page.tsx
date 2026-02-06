import WeddingPage from "@/components/WeddingPage";
import type { Metadata } from "next";
import weddingConfig from "@/config/wedding";

const side = weddingConfig.sides["nha-gai"];

export const metadata: Metadata = {
  title: `${side.heroTitle} | ${weddingConfig.groom.name} & ${weddingConfig.bride.name}`,
  description: `${side.heroTitle} - ${weddingConfig.groom.fullName} & ${weddingConfig.bride.fullName} - ${weddingConfig.date.full} tại ${side.venue.name}`,
};

export default function NhaGaiPage() {
  return <WeddingPage side="nha-gai" />;
}
