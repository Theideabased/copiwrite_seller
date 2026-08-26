import type { Metadata } from "next";
import { SlidesDeck } from "./slides-deck";

export const metadata: Metadata = {
  title: "WhatsApp Views-to-Sales: Video Slides",
  description:
    "A 16:9 presentation deck for the WhatsApp Views-to-Sales sales video.",
  robots: { index: false, follow: false },
};

export default function WhatsAppSalesSlidesPage() {
  return <SlidesDeck />;
}
