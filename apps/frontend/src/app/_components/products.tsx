import { Award } from "lucide-react";
import Link from "next/link";
import React from "react";

const products = [
  {
    title: "Admission",
    pageLink: "#",
    Icon: Award,
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
  },
  {
    title: "Visa",
    pageLink: "#",
    Icon: Award,
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
  },
  {
    title: "Accommodation",
    pageLink: "#",
    Icon: Award,
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
  },
  {
    title: "Work",
    pageLink: "#",
    Icon: Award,
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
  },
  {
    title: "Immigration",
    pageLink: "#",
    Icon: Award,
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
  },
  {
    title: "Tuition",
    pageLink: "#",
    Icon: Award,
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
  },
  {
    title: "Scholarship",
    pageLink: "#",
    Icon: Award,
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
  },
];

const Products: React.FC = () => {
  return (
    <section>
      <div className="md:gap-15 container mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {products.map(({ title, pageLink, Icon, overview }, i) => (
          <Link
            key={title}
            href={pageLink}
            aria-label={`Link to ${title} page`}
            className={`flex gap-4 ${i === products.length - 1 ? "lg:col-start-2" : ""}`}
          >
            <div className="bg-brand-50 self-start rounded-md p-2">
              <Icon size={20} className="text-brand" />
            </div>
            <div className="space-y-2">
              <h2 className="!text-md underline">{title}</h2>
              <p className="text-md">{overview}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
export default Products;
