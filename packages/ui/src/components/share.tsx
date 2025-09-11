"use client";

import React, { useCallback, useMemo, useState } from "react";
import {
  SiFacebook,
  SiPinterest,
  SiWhatsapp,
  SiX,
} from "@icons-pack/react-simple-icons";
import { useIsMobile } from "../hooks/use-mobile";
import { Button } from "./button";
import { Linkedin, Share as ShareIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { toast } from "./sonner";

interface Props {
  title: string;
  text: string;
  url: string;
  context: "Program" | "School";
  imageUrl: string;
  copyToClipboard: (text: string, alertMessage?: string) => void;
}
export const Share: React.FC<Props> = ({
  title,
  text,
  url,
  context,
  imageUrl,
  copyToClipboard,
}) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const data = useMemo(
    () => ({
      title,
      text,
      url: encodeURIComponent(url),
    }),
    [title, text, url],
  );

  const imgUrl = useMemo(() => encodeURIComponent(imageUrl), [imageUrl]);

  const socialLinks = useMemo(
    () => [
      {
        Icon: SiWhatsapp,
        url: `https://wa.me/?text=${data.url}`,
      },
      {
        Icon: SiX,
        url: `https://twitter.com/intent/tweet?text=${data.text}&url=${data.url}`,
      },
      {
        Icon: SiFacebook,
        url: `https://www.facebook.com/sharer/sharer.php?u=${data.url}`,
      },
      {
        Icon: Linkedin,
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${data.url}`,
      },
      {
        Icon: SiPinterest,
        url: `https://pinterest.com/pin/create/button/?url=${data.url}&media=${imgUrl}&description=${data.text}`,
      },
    ],
    [data, imgUrl],
  );

  const handleShare = useCallback(async () => {
    try {
      if (navigator.canShare(data)) {
        throw new Error("error");
        await navigator.share(data);
      } else {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, [data]);

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => handleShare()}>
        <ShareIcon />
      </Button>

      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle className="!text-lg">Share this {context}</SheetTitle>
              <SheetDescription>{data.title}</SheetDescription>
            </SheetHeader>
            <div className="space-y-3 p-3">
              <div className="flex items-center justify-around gap-4">
                {socialLinks.map(({ Icon, url }) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    aria-label={"share"}
                    className="rounded-full border p-3"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-sm">Or copy link</p>
                <div className="py-1 px-4 rounded-md border flex items-center gap-2">
                  <p className="text-sm line-clamp-1">{url}</p>
                  <Button
                    variant="ghost"
                    className="text-sm text-brand p-0 hover:bg-inherit"
                    onClick={() => copyToClipboard(url, "Link")}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="!text-lg">
                Share this {context}
              </DialogTitle>
              <DialogDescription>{data.title}</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div className="flex items-center justify-around gap-4">
                {socialLinks.map(({ Icon, url }) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    aria-label={"share"}
                    className="rounded-full border p-3"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-sm">Or copy link</p>
                <div className="py-1 px-4 rounded-md border flex items-center gap-2">
                  <p className="text-sm line-clamp-1">{url}</p>
                  <Button
                    variant="ghost"
                    className="text-sm text-brand p-0 hover:bg-inherit"
                    onClick={() => copyToClipboard?.(url, "Link")}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
