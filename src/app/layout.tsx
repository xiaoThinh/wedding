import type { Metadata } from "next";
import "./globals.css";
import MusicProvider from "@/components/MusicProvider";
import weddingConfig from "@/config/wedding";

const { groom, bride, date } = weddingConfig;

export const metadata: Metadata = {
  title: `${groom.name} ❤ ${bride.name} | Wedding`,
  description: `Thiệp cưới online - ${groom.fullName} - ${bride.fullName} - ${date.full}`,
  keywords: ["wedding", "thiệp cưới", groom.name, bride.name],
  openGraph: {
    title: `${groom.name} ❤ ${bride.name} | ${date.full}`,
    description: "Chúng mình sắp cưới! Hân hạnh mời bạn đến chung vui.",
    images: ["/images/loading-bg.jpg"],
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="font-body antialiased max-w-full overflow-x-hidden">
        <MusicProvider>{children}</MusicProvider>
      </body>
    </html>
  );
}
