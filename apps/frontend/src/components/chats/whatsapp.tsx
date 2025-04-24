"use client";
import { WHATSAPP_PHONE_NUMBER } from "@/src/utils";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import dayjs from "dayjs";
import { Headset, SendHorizonal } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const WhatsAppWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-initial fixed bottom-5 right-5 z-50 rounded-full bg-[#075E54] !px-3 !py-7"
        >
          <SiWhatsapp className="text-background dark:text-foreground size-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-sm mx-auto mr-3 overflow-hidden border-0 bg-[url(/assets/images/backgrounds/whatsapp_background.jpeg)] bg-cover bg-no-repeat p-0 pb-2">
        <div className="flex items-center gap-4 bg-[#075E54] px-4 py-5 text-white">
          <div className="rounded-full bg-white p-2 text-black">
            <Headset />
          </div>
          <div className="flex-1">
            <p className="text-md font-semibold">Support</p>
            <p className="text-sm font-medium">
              Typically replies within minutes
            </p>
          </div>
        </div>
        <div className="space-y-5 p-4 text-black dark:text-black">
          <p className="mx-auto w-fit rounded-md bg-white px-2 py-1 text-xs font-medium shadow-sm">
            {dayjs().format("DD MMMM YYYY")}
          </p>
          <div className="rounded-md bg-white px-3 py-2 shadow-sm">
            <p className="mx-auto w-fit text-sm font-medium">
              Thank you for contacting Skyned Consults! Please let us know how
              we can help you.
            </p>
            <p className="ml-auto w-fit text-xs font-medium opacity-70">
              {dayjs().format("hh:mm a")}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 px-2 text-black dark:text-black">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="message"
            className="rounded-full border-0 bg-white ring-0 focus:!border-0 focus:!ring-0 dark:bg-white"
          />
          <Button
            asChild
            variant="ghost"
            className="size-fit rounded-full !p-2"
          >
            <Link
              href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`}
              aria-label="Chat with us on whatsApp"
              className="bg-[#075E54] p-2"
              target="_blank"
            >
              <SendHorizonal className="text-white" />
            </Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WhatsAppWidget;
