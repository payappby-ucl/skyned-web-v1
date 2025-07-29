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
    <header className="fixed top-0 z-50 w-screen">
      <div className="container relative mx-auto px-4 md:px-10 lg:px-20">
        <div className="absolute left-1/2 top-0 h-full w-[80%] -translate-x-1/2 bg-white" />
        {/* Left */}
        <div className="absolute left-[5%] top-0 z-10 h-full w-[5%] rounded-bl-2xl bg-white lg:rounded-bl-3xl">
          <FringedEdge className="absolute right-full top-[-1px] z-[1] h-1/4 rotate-90 text-white md:h-1/2" />
        </div>
        {/* Right */}
        <div className="absolute left-[90%] top-0 z-10 h-full w-[5%] rounded-br-2xl bg-white lg:rounded-br-3xl">
          <FringedEdge className="absolute left-full top-[-1px] z-[1] h-1/4 text-white md:h-1/2" />
        </div>

        <div className="relative z-10 flex items-center justify-between py-2 md:py-4">
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
