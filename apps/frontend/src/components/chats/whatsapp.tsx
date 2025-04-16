import { WHATSAPP_PHONE_NUMBER } from "@/src/utils";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import React from "react";

const defaultMessage = encodeURIComponent(
  "Do you dream of studying abroad and experiencing a world-class education?",
);

const WhatsAppWidget: React.FC = () => {
  return (
    <Link
      href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${defaultMessage}`}
      aria-label="Chat with us on whatsApp"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-[#075E54] p-2"
      target="_blank"
    >
      <SiWhatsapp size={25} className="text-background dark:text-foreground" />
    </Link>
  );
};

export default WhatsAppWidget;
