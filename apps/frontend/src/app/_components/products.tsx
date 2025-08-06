// import { Award } from "lucide-react";
// import Link from "next/link";
// import React from "react";

// const products = [
//   {
//     title: "Admission",
//     pageLink: "#",
//     Icon: Award,
//     overview:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
//   },
//   {
//     title: "Visa",
//     pageLink: "#",
//     Icon: Award,
//     overview:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
//   },
//   {
//     title: "Accommodation",
//     pageLink: "#",
//     Icon: Award,
//     overview:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
//   },
//   {
//     title: "Work",
//     pageLink: "#",
//     Icon: Award,
//     overview:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
//   },
//   {
//     title: "Immigration",
//     pageLink: "#",
//     Icon: Award,
//     overview:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
//   },
//   {
//     title: "Tuition",
//     pageLink: "#",
//     Icon: Award,
//     overview:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
//   },
//   {
//     title: "Scholarship",
//     pageLink: "#",
//     Icon: Award,
//     overview:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
//   },
// ];

// const Products: React.FC = () => {
//   return (
//     <section>
//       <div className="md:gap-15 container mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
//         {products.map(({ title, pageLink, Icon, overview }, i) => (
//           <Link
//             key={title}
//             href={pageLink}
//             aria-label={`Link to ${title} page`}
//             className={`flex gap-4 ${i === products.length - 1 ? "lg:col-start-2" : ""}`}
//           >
//             <div className="bg-brand-50 self-start rounded-md p-2">
//               <Icon size={20} className="text-brand" />
//             </div>
//             <div className="space-y-2">
//               <h2 className="!text-md underline">{title}</h2>
//               <p className="text-md">{overview}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// };
// export default Products;

import { Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
    title: "Tuition payments made easy",
    pageLink: "#",
    imageUrl: "/assets/images/products/3.png",
    overview:
      "Thanks to our partners, tuition payments are faster, safer, and fully transparent.",
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
      {products.map(({ title, pageLink, imageUrl, overview }, i) => (
        <Link
          key={title}
          href={pageLink}
          aria-label={`Link to ${title} page`}
          className="grid grid-cols-1 items-center gap-5 md:grid-cols-2"
        >
          <div className={`space-y-4 ${(i + 1) % 2 === 0 ? "md:order-2" : ""}`}>
            <h2 className="!text-xxl font-semibold">{title}</h2>
            <div
              className="space-y-4"
              dangerouslySetInnerHTML={{
                __html: overview,
              }}
            />
          </div>
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={400}
            className="rounded-4xl justify-self-center"
          />
        </Link>
      ))}
    </section>
  );
};
export default Products;
