import React from "react";
import NewsLetterForm from "./news-letter-form";

const NewsLetter: React.FC = () => {
  return (
    <div className="grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-5">
        <h2>Our Newsletter</h2>
        <p>
          On-campus work means you can get a job in places that belong to your
          school. On-campus employers can be your school.
        </p>
      </div>
      <NewsLetterForm />
    </div>
  );
};

export default NewsLetter;
