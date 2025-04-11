import React from "react";
import Office from "./office";

interface Props {
  offices: {
    location: string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
  }[];
}

const Offices: React.FC<Props> = ({ offices }) => {
  return (
    <section className="bg-accent">
      <div className="text-center">
        <p>Our Office Address</p>
        <h2>Our Office Around the World</h2>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {offices.map((office, i) => (
          <Office office={office} key={`${office.location} - ${i}`} />
        ))}
      </div>
    </section>
  );
};

export default Offices;
