import React from "react";
import NewsLetterForm from "./news-letter-form";

const NewsLetter: React.FC = () => {
  return (
    <div className="space-y-5 pt-5">
      <div>
        <h2 className="text-brand !text-lg font-bold">
          Subscribe to our Newsletter
        </h2>
        <p className="text-sm">
          Stay updated with our latest news and special offers
        </p>
      </div>
      <NewsLetterForm />
    </div>
  );
};

export default NewsLetter;
