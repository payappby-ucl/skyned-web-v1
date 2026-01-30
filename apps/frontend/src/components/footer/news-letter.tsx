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
          Ready to study abroad? Get the latest tips, scholarships, and insider
          info, straight to your inbox
        </p>
      </div>
      <NewsLetterForm />
    </div>
  );
};

export default NewsLetter;
