import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { env } from "../config";
import { cn } from "@workspace/ui/lib/utils";
import logo from "../../public/assets/images/brand/logo.png";
import { Button } from "@workspace/ui/components/button";
import { Menu, SearchIcon } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { FringedEdge } from "./svg";

const MobileNav: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="mr-5 lg:hidden">
        <Menu size={30} aria-label="Open Mobile Navigation" />
      </SheetTrigger>
      <SheetContent side="right"></SheetContent>
    </Sheet>
  );
};

const Nav: React.FC = () => {
  return (
    <header className="fixed top-0 w-screen z-50">
      <div className="container mx-auto px-4 md:px-10 lg:px-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white w-[80%] h-full"/>
        {/* Left */}
        <div className="absolute top-0 left-[5%] w-[5%] h-full z-10 bg-white rounded-bl-2xl lg:rounded-bl-3xl">
        <FringedEdge className="absolute top-[-1px] right-full h-1/4 md:h-1/2 z-[1] text-white rotate-90" />
        </div>
        {/* Right */}
        <div className="absolute top-0 left-[90%] w-[5%] h-full z-10 bg-white rounded-br-2xl lg:rounded-br-3xl">
        <FringedEdge className="absolute top-[-1px] left-full h-1/4 md:h-1/2 z-[1] text-white" />
        </div>

        <div className="flex items-center justify-between relative py-2 md:py-4 z-10">
           <Link href="/">
                  <Image
                    src={logo}
                    alt={`${env.organization.name}'s Logo`}
                    className="ml-4 w-20 md:w-24 lg:w-28"
                  />
              </Link>

                      <NavigationMenu>
          <NavigationMenuList className="hidden lg:flex lg:flex-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Apply</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/country-of-choice" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "hover:bg-transparent",
                  )}
                >
                  Country of choice
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/information-hub" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "hover:bg-transparent",
                  )}
                >
                  Information Hub
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "hover:bg-transparent",
                  )}
                >
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "hover:bg-transparent",
                  )}
                >
                  Contact Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>


          <div className="hidden items-center gap-4 lg:flex">
            <search>
              <Button size="icon" variant="ghost">
                <SearchIcon />
              </Button>
            </search>
            <Button asChild variant="brand" className="rounded-full text-sm">
              <Link
                href="/consultation"
                aria-label="Link to Book a Consultation Page"
              >
                Speak with an Expert
              </Link>
            </Button>
          </div>

          <MobileNav />
        </div>
      </div>
    </header> 
  );
};

export default Nav;
