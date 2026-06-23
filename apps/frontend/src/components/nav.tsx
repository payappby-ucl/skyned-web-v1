import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { env } from "../config";
import logo from "../../public/assets/images/brand/logo.png";
import { Button } from "@workspace/ui/components/button";
import {
  BuildingIcon,
  CalendarIcon,
  InfoIcon,
  LucideIcon,
  MailIcon,
  MenuIcon,
  NewspaperIcon,
  PhoneOutgoingIcon,
  PiggyBankIcon,
  ScaleIcon,
  SearchIcon,
  ShieldQuestionIcon,
  TagIcon,
  TreePineIcon,
} from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { FringedEdge } from "./svg";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { HeaderSearch } from "./header-search";

type MenuSubItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

type MenuItem =
  | {
      title: string;
      href: string;
      description: string;
      icon: LucideIcon;
      image?: undefined;
      subMenu?: undefined;
    }
  | {
      title: string;
      href?: undefined;
      description?: string;
      icon?: LucideIcon;
      image: {
        src: string;
        alt: string;
      };
      subMenu: MenuSubItem[];
    };

const menuItems: MenuItem[] = [
  // {
  //   title: "Loan",
  //   href: "/loans",
  //   description: "Explore flexible study loan options",
  //   icon: PiggyBankIcon,
  // },
  {
    title: "About Us",
    href: "/about",
    description: "Learn more about us",
    icon: InfoIcon,
  },
  {
    title: "Information Hub",
    href: "/information-hub",
    description: "Access our information hub",
    icon: NewspaperIcon,
  },
  {
    title: "Contact Us",
    href: "/contact",
    description: "Get in touch with us",
    icon: MailIcon,
  },
  {
    title: "Schools",
    href: "/schools",
    description: "Explore our schools",
    icon: BuildingIcon,
  },
  {
    title: "Resources",
    image: {
      src: "/assets/images/backgrounds/resources-bg.jpg",
      alt: "Explore our resources",
    },
    subMenu: [
      {
        title: "Consultations",
        description: "Book a consultation with us",
        icon: CalendarIcon,
        href: "/consultation",
      },
      {
        title: "Our Village",
        description: "Join our community",
        icon: TreePineIcon,
        href: "/our-village",
      },
      {
        title: "FAQs",
        description: "Frequently Asked Questions",
        icon: InfoIcon,
        href: "/faqs",
      },
      {
        title: "Blog",
        description: "Latest Articles",
        icon: NewspaperIcon,
        href: "/blog",
      },
      {
        title: "Privacy Policy",
        description: "How we handle your data",
        icon: ShieldQuestionIcon,
        href: "/privacy-policy",
      },
      {
        title: "Terms of Service",
        description: "Our terms and conditions",
        icon: ScaleIcon,
        href: "/terms-of-service",
      },
      {
        title: "Email Us",
        description: "Have a question? Send us an email.",
        href: "mailto:info@skyned.com",
        icon: MailIcon,
      },
      {
        title: "Give Us a Call",
        description: "Call our support on (+234) 816 5800 388",
        href: "tel:+2348165800388",
        icon: PhoneOutgoingIcon,
      },
    ],
  },
  {
    title: "Buy Test Vouchers",
    href: "/test-vouchers",
    description: "Purchase GRE, TOEFL, Duolingo and Pearson vouchers",
    icon: TagIcon,
  },
];

const MobileNav: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="mr-5 lg:hidden">
        <MenuIcon size={30} aria-label="Open Mobile Navigation" />
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>
            This menu provides quick access to all main navigation links and
            helpful resources. Use it to explore our schools, learn more about
            Skyned, find answers to common questions, or get in touch with our
            support team.
          </SheetDescription>
        </SheetHeader>
        <SheetClose
          asChild
          className="flex items-center justify-between border-b px-3 py-2"
        >
          <Link href="/">
            <SheetTitle className="sr-only">
              Skyned Educational Consults
            </SheetTitle>
            <img
              src={"/assets/images/brand/logo_white.png"}
              alt="Skyned Educational Consults"
              className="h-10 invert dark:invert-0"
            />
          </Link>
        </SheetClose>

        <ScrollArea className="h-[calc(100vh-60px)]">
          <div className="mb-8 space-y-4 px-3">
            <div>
              <strong className="text-muted-foreground mb-1 px-2 text-xs font-medium uppercase tracking-wider">
                Navigation
              </strong>
              <div>
                {menuItems.map(({ title, href, description, icon: Icon }) => (
                  <SheetClose key={title} asChild>
                    {href && (
                      <Link
                        href={href}
                        className="flex flex-col px-2 py-2 transition-colors hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center">
                            <Icon className="text-muted-foreground h-4 w-4" />
                          </div>
                          <div className="text-sm font-medium">{title}</div>
                        </div>
                        <p className="text-muted-foreground ml-11 mt-0.5 text-xs">
                          {description}
                        </p>
                      </Link>
                    )}
                  </SheetClose>
                ))}
              </div>
            </div>

            {/* <div>
                    <strong className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1 px-2">
                      Resources
                    </strong>
                    <div>
                      {resources.map(
                        ({ name, href, description, icon: Icon }) => (
                          <SheetClose key={name} asChild>
                            <Link
                              href={href}
                              className="flex flex-col py-2 px-2 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-muted">
                                  <Icon className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="font-medium text-sm">
                                  {name}
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5 ml-11">
                                {description}
                              </p>
                            </Link>
                          </SheetClose>
                        )
                      )}
                    </div>
                  </div> */}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

const Nav: React.FC = () => {
  return (
    <header className="fixed top-0 z-50 w-screen">
      <div className="container relative mx-auto px-4 md:px-10 lg:px-20">
        {/* Center */}
        <div className="absolute left-1/2 top-0 z-[2] h-full w-[81%] -translate-x-1/2 bg-white" />
        <div className="absolute left-1/2 top-0 z-[1] h-full w-[80%] -translate-x-1/2 bg-white/50 drop-shadow-[0_4px_2px_rgba(0,0,0,0.15)] md:drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]" />

        {/* Left */}
        <div className="absolute left-[5%] top-0 z-0 h-full w-[5%] rounded-bl-2xl bg-white drop-shadow-[-2px_2px_2px_rgba(0,0,0,0.15)] md:drop-shadow-[-4px_2px_6px_rgba(0,0,0,0.15)] lg:rounded-bl-3xl">
          <FringedEdge className="absolute right-[99%] top-[-1px] z-[1] h-1/4 rotate-90 text-white md:h-1/2" />
        </div>

        {/* Right */}
        <div className="absolute left-[90%] top-0 z-0 h-full w-[5%] rounded-br-2xl bg-white drop-shadow-[2px_2px_2px_rgba(0,0,0,0.15)] md:drop-shadow-[4px_2px_6px_rgba(0,0,0,0.15)] lg:rounded-br-3xl">
          <FringedEdge className="absolute left-[99%] top-[-1px] z-[1] h-1/4 text-white md:h-1/2" />
        </div>

        <div className="relative z-10 flex items-center justify-between py-2 md:py-4">
          <Link href="/">
            <Image
              src={logo}
              alt={`${env.organization.name}'s Logo`}
              className="ml-4 w-20 md:w-24 lg:w-28"
            />
          </Link>

          <NavigationMenu
            className="hidden lg:block"
            aria-label="Main Navigation"
          >
            <NavigationMenuList>
              {menuItems.map(({ title, href, image, subMenu }) => (
                <NavigationMenuItem key={title}>
                  {!subMenu && href ? (
                    <NavigationMenuLink asChild>
                      <Link href={href}>{title}</Link>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[900px] grid-cols-[200px_1fr] gap-3 p-4">
                          <div className="relative h-full min-h-40 w-full overflow-hidden rounded-sm">
                            <Image
                              src={image?.src || ""}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority
                              alt={`${title} submenu links`}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                              <p className="!text-sm !font-medium text-white">
                                {image?.alt}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {subMenu?.map(
                              ({ title, href, description, icon: Icon }) => {
                                return (
                                  <Link
                                    key={title}
                                    href={href}
                                    className="hover:bg-accent group flex items-start gap-3 rounded-sm p-3"
                                  >
                                    <div className="bg-muted text-muted-foreground rounded-sm p-2">
                                      <Icon className="group-hover:text-brand-500 h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      <div className="text-sm font-medium">
                                        {title}
                                      </div>
                                      <div className="text-muted-foreground text-xs">
                                        {description}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              },
                            )}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center gap-4 lg:flex">
            <HeaderSearch />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <HeaderSearch />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
