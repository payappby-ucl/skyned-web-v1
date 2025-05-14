import { teams } from "@/src/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { OurTeamType } from "../page";
import getSocialIcon from "@/src/components/social-icons";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

const MemberDetails: React.FC<OurTeamType> = ({
  firstName,
  lastName,
  primaryImage,
  secondaryImage,
  jobTitle,
  socials,
  about,
}) => {
  return (
    <Sheet>
      <SheetTrigger
        className="bg-brand absolute bottom-0 right-0 rounded-br-md pb-1 pl-5 pr-1 pt-5"
        style={{
          clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
        }}
      >
        <ArrowRight
          size={20}
          className="text-background dark:text-foreground"
        />
      </SheetTrigger>
      <SheetContent className="w-[100-vw] md:max-w-[80vw] lg:max-w-[50vw] [&>button]:hidden">
        <div
          className="flex items-center justify-center gap-1 bg-gray-700 bg-cover bg-top bg-no-repeat p-5 bg-blend-multiply"
          style={{
            backgroundImage: `url(${secondaryImage?.url || primaryImage.url})`,
          }}
        >
          <SheetHeader>
            <SheetTitle className="text-background dark:text-foreground !text-2xl">
              {firstName} {lastName}
            </SheetTitle>
            <SheetDescription className="text-background dark:text-foreground">
              {jobTitle}
            </SheetDescription>
          </SheetHeader>
          <Avatar className="h-32 w-32">
            <AvatarImage
              src={primaryImage.url}
              alt={`${firstName} ${lastName}'s picture`}
              className="object-cover object-top"
            />
            <AvatarFallback className="uppercase">
              {firstName[0]}
              {lastName[0]}
            </AvatarFallback>
          </Avatar>
        </div>
        <section className="mx:px-10 flex h-full flex-col gap-5 overflow-y-scroll px-5 py-10">
          <SheetClose className="text-brand dark:text-foreground flex items-center gap-1 text-sm font-bold">
            <ArrowLeft size={15} />
            Back
          </SheetClose>

          <h2 className="!text-md !font-semibold uppercase">
            About {firstName} {lastName}
          </h2>

          {about ? (
            <div
              className="wysiwyg-view"
              dangerouslySetInnerHTML={{ __html: about }}
            />
          ) : null}

          {socials?.length ? (
            <div className="mt-auto flex items-center gap-2">
              {socials.map((social) => {
                const Icon = getSocialIcon({ name: social.name });

                return (
                  <Button
                    asChild
                    key={social.name}
                    variant="outline"
                    size="icon"
                    className="!size-8 !rounded-full"
                  >
                    <Link
                      href={social.url}
                      target="_blank"
                      aria-label={`${firstName} ${lastName}'s ${social.name} page`}
                    >
                      <Icon className="!size-4" />
                    </Link>
                  </Button>
                );
              })}
            </div>
          ) : null}
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default MemberDetails;
