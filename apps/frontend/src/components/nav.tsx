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
    <header>
      <div className="container mx-auto md:px-20">
        <NavigationMenu className="!max-w-full items-center justify-between">
          <NavigationMenuList className="py-4">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "hover:bg-transparent",
                  )}
                >
                  <Image
                    src={logo}
                    alt={`${env.organization.name}'s Logo`}
                    className="w-30"
                  />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuList className="hidden lg:flex lg:flex-1">
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
              <NavigationMenuTrigger>Apply</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/village" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "hover:bg-transparent",
                  )}
                >
                  Village
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>School</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-max">
                  <li>
                    <NavigationMenuLink>School page</NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
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
          </NavigationMenuList>
          <div className="hidden items-center gap-4 lg:flex">
            <search>
              <Button size="icon" variant="ghost">
                <SearchIcon />
              </Button>
            </search>
            <Button asChild variant="brand" className="rounded-full">
              <Link
                href="/consultation"
                aria-label="Link to Book a Consultation Page"
              >
                Book Consultation
              </Link>
            </Button>
          </div>
          <MobileNav />
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Nav;
