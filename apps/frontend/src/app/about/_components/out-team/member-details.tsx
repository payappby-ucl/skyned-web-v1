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

const MemberDetails: React.FC<(typeof teams)[0]> = ({
  firstName,
  lastName,
  imageUrl,
  title,
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
      <SheetContent className="w-[100-vw] md:w-[80vw] [&>button]:hidden">
        <div
          className="flex items-center justify-center gap-1 bg-gray-700 bg-cover bg-center bg-no-repeat p-5 bg-blend-multiply"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        >
          <SheetHeader>
            <SheetTitle className="text-background dark:text-foreground !text-2xl">
              {firstName} {lastName}
            </SheetTitle>
            <SheetDescription className="text-background dark:text-foreground">
              {title}
            </SheetDescription>
          </SheetHeader>
          <Avatar className="h-32 w-32">
            <AvatarImage
              src={imageUrl}
              alt={`${firstName} ${lastName}'s picture`}
              className="object-cover"
            />
            <AvatarFallback className="uppercase">
              {firstName[0]}
              {lastName[0]}
            </AvatarFallback>
          </Avatar>
        </div>
        <section className="px-2">
          <SheetClose className="text-brand flex items-center gap-1 text-sm font-bold">
            <ArrowLeft size={15} />
            Back
          </SheetClose>
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default MemberDetails;
