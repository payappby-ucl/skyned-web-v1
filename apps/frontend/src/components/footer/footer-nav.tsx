import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import NewsLetter from "./news-letter";

const navLinks = [
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },

  {
    title: "Our Village",
    href: "/our-village",
  },
  {
    title: "Cookie Policy",
    href: "/cookies",
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
  },

  {
    title: "Partnership",
    href: "/partnership",
  },
  {
    title: "Terms of service",
    href: "/terms-of-service",
  },
  {
    title: "Meet the team",
    href: "/team",
  },
];

const FooterNav: React.FC = () => {
  return (
    <section className="text-foreground dark:text-background divide-brand/20 divide-y rounded-xl bg-white p-5 lg:col-start-3">
      <div className="space-y-5 pb-5">
        <h2 className="text-brand border-brand rounded-l-sm border-l-[5px] pl-2 !text-lg font-bold">
          Quick Links
        </h2>
        <nav
          className="grid grid-cols-2 items-center justify-center gap-2 md:justify-start"
          aria-label="Footer Navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-md flex items-center gap-2 hover:underline"
            >
              <ChevronRight size={15} />
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
      <NewsLetter />
    </section>
  );
};

export default FooterNav;
