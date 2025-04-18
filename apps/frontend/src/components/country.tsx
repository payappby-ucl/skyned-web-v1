import Image from "next/image";
import Link from "next/link";
import React from "react";
import australiaImage from "../../public/assets/images/countries/australia.jpeg";
import canadaImage from "../../public/assets/images/countries/canada.jpg";
import unitedKingdomImage from "../../public/assets/images/countries/united_kingdom.jpeg";
import unitedStatesImage from "../../public/assets/images/countries/united_states.jpeg";
import maltaImage from "../../public/assets/images/countries/malta.jpeg";
import germanyImage from "../../public/assets/images/countries/germany.jpg";
import franceImage from "../../public/assets/images/countries/france.jpg";

const countries = [
  {
    name: "Australia",
    image: australiaImage,
    pageLink: "#",
    overview:
      "Study at top-ranked universities in Australia, gain real-world experience, and build a future that goes beyond graduation. With post-study work visas, international students can work in Australia after completing their programs, opening doors to career growth and even permanent residency. Add in scholarships, hands-on learning, and a vibrant lifestyle, and Australia becomes more than a study destination.",
  },
  {
    name: "Canada",
    image: canadaImage,
    pageLink: "#",
    overview:
      "Get a globally recognized education, real work experience in Canada, and a fast track to permanent residency, all in one of the world's safest, most welcoming countries. Canada offers affordable tuition, post-graduation work permits of up to three years, and clear pathways to PR and citizenship. With strong job prospects in tech, healthcare, and skilled trades, studying in Canada sets you up for long-term success.",
  },
  {
    name: "Malta",
    image: maltaImage,
    pageLink: "#",
    overview:
      "Study in an English-speaking country with low living costs, strong job prospects, and a gateway to Europe. Malta offers quality education, post-study work opportunities, and a safe, welcoming environment. With its warm climate, rich culture, and prime Mediterranean location, Malta is more than a study destination, it's an experience.",
  },
  {
    name: "UK",
    image: unitedKingdomImage,
    pageLink: "#",
    overview:
      "Earn a globally respected degree from top-ranked universities and unlock post-study work opportunities in one of the world's most diverse and historic countries. The UK offers shorter degree programs, strong career pathways, and a clear route to permanent residency (ILR). The UK is a smart, future-forward choice.",
  },
  {
    name: "USA",
    image: unitedStatesImage,
    pageLink: "#",
    overview:
      "Get a globally respected degree, explore a vibrant mix of cultures, and gain career-boosting experience at some of the world's best universities. From cutting-edge research to real-world internships, the U.S. offers unmatched academic and professional opportunities. The US is a top choice for ambitious international students ready to stand out.",
  },
  {
    name: "Germany",
    image: germanyImage,
    pageLink: "#",
    overview:
      "Get a world-class education at little to no tuition cost. Germany's top-ranked public universities, cutting-edge research opportunities, and strong job market, especially in engineering, IT, and tech. Enjoy a multicultural lifestyle, up to 18 months post-study work options, and affordable living, all in the heart of Europe.",
  },
  {
    name: "France",
    image: franceImage,
    pageLink: "#",
    overview:
      "Experience world-class education at affordable prices. With top universities, vibrant student life, and a rich cultural scene. Explore diverse academic programs, gain global career prospects, and enjoy France's strategic location in the heart of Europe. Plus, with affordable tuition, scholarships, and the chance to learn French, it's an ideal destination for international students.",
  },
];

const CountryOfChoice: React.FC = () => {
  return (
    <section className="space-y-10">
      <h2 className="text-center">Country of Choice</h2>
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-8 lg:grid-cols-8">
        {countries.map(({ name, image, pageLink, overview }) => (
          <Link
            key={name}
            href={pageLink}
            className="lg:nth-5:col-start-2 space-y-2 place-self-start md:col-span-4 md:last:col-start-3 lg:col-span-2 lg:last:col-start-6"
          >
            <Image
              src={image}
              alt={`${name}'s random place image`}
              className="w-full rounded-t-md object-cover"
            />
            <div className="space-y-2 px-2">
              <h3 className="!text-lg underline">{name}</h3>
              <p className="text-sm">{overview}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CountryOfChoice;
