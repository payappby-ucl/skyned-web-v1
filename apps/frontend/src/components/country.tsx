import Image from "next/image";
import Link from "next/link";
import React from "react";
import australiaImage from "../../public/assets/images/countries/australia.jpeg";
import canadaImage from "../../public/assets/images/countries/canada.jpg";
import unitedKingdomImage from "../../public/assets/images/countries/united_kingdom.jpeg";
import unitedStatesImage from "../../public/assets/images/countries/united_states.jpeg";

const countries = [
  {
    name: "Australia",
    image: australiaImage,
    pageLink: "#",
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
  },
  {
    name: "Canada",
    image: canadaImage,
    pageLink: "#",
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
  },
  {
    name: "United Kingdom",
    image: unitedKingdomImage,
    pageLink: "#",
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
  },
  {
    name: "United States of America",
    image: unitedStatesImage,
    pageLink: "#",
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate, tortor ut tempus scelerisque, erat nunc elementum neque, id mattis tellus libero vitae enim. Ut suscipit porttitor dolor, et rutrum.",
  },
];

const CountryOfChoice: React.FC = () => {
  return (
    <section className="space-y-10">
      <h2 className="text-center">Country of Choice</h2>
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-4">
        {countries.map(({ name, image, pageLink, overview }) => (
          <Link key={name} href={pageLink} className="space-y-2">
            <Image
              src={image}
              alt={`${name}'s random place image`}
              className="w-full rounded-t-md object-cover"
            />
            <div className="space-y-2 px-2">
              <h3 className="!text-lg underline">{name}</h3>
              <p className="text-md">{overview}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CountryOfChoice;
