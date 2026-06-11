import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PaymentButton } from "@/src/components/payment/payment-button";

const products = [
  {
    title: "Expert Admissions Support",
    pageLink: "#",
    imageUrl: "/assets/images/products/1.png",
    overview:
      "Join thousands of students admitted to top international schools with our free expert admissions support.",
  },
  {
    title: "Visa Application Made Easy",
    pageLink: "#",
    imageUrl: "/assets/images/products/2.png",
    overview:
      "We provide study visa support for applicants, with added support for dependents.",
  },
  {
    title: "Test vouchers at the best prices",
    pageLink: "/test-vouchers",
    imageUrl: "/assets/images/products/3.png",
    overview:
      "Buy GRE, TOEFL, Duolingo, and Pearson test vouchers at the best prices through our ApplyBoard partnership — with revenue share so you keep more.",
    payButton: true,
  },
  {
    title: "Study now, pay later",
    pageLink: "#",
    imageUrl: "/assets/images/products/4.png",
    overview:
      "Access affordable study loans through our trusted partners like Passage and MPOWER",
  },
  {
    title: "Get full post-arrival support",
    pageLink: "#",
    imageUrl: "/assets/images/products/5.png",
    overview:
      "We support you beyond admission, from finding accommodation to settling into your new country.",
  },
];

const Products: React.FC = () => {
  return (
    <section className="space-y-10">
      {products.map(({ title, pageLink, imageUrl, overview, payButton }, i) => {
        const content = (
          <>
            <div className={`space-y-4 ${(i + 1) % 2 === 0 ? "md:order-2" : ""}`}>
              <h2 className="!text-xxl font-semibold">{title}</h2>
              <div className="space-y-4" dangerouslySetInnerHTML={{ __html: overview }} />
              {payButton && (
                <div>
                  <PaymentButton label="Buy Test Vouchers" color="#3477FE" size="medium" />
                </div>
              )}
            </div>
            <Image
              src={imageUrl}
              alt={title}
              width={400}
              height={400}
              className="rounded-4xl justify-self-center"
            />
          </>
        );

        if (payButton) {
          return (
            <div key={title} className="grid grid-cols-1 items-center gap-5 md:grid-cols-2">
              {content}
            </div>
          );
        }

        return (
          <Link
            key={title}
            href={pageLink}
            aria-label={`Link to ${title} page`}
            className="grid grid-cols-1 items-center gap-5 md:grid-cols-2"
          >
            {content}
          </Link>
        );
      })}
    </section>
  );
};
export default Products;
