import React from "react";
import NewsLetter from "./news-letter";
import FooterNav from "./footer-nav";
import CopyRight from "./copy-right";

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand text-background dark:text-foreground">
      <div className="divide-brand-50/20 container mx-auto divide-y">
        <NewsLetter />
        <FooterNav />
        <CopyRight />
      </div>
    </footer>
  );
};

export default Footer;
