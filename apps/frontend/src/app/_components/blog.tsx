import Link from "next/link";
import React from "react";
import BlogPost from "./blog-post";

const blogPosts = [
  {
    title: "Study Destinations",
    overview:
      "Explore the best countries for international students, including top universities, cost of living, and cultural experiences",
    imageUrl:
      "https://cdn.pixabay.com/photo/2014/08/27/08/07/blogging-428954_1280.jpg",
    blogLink: "#",
    author: {
      firstName: "Ronald",
      lastName: "Richards",
      imageUrl:
        "https://cdn.pixabay.com/photo/2022/09/12/17/39/man-7450033_1280.jpg",
    },
    createdAt: new Date(),
  },
  {
    title: "Visa & Immigration",
    overview:
      "Step-by-step guides on how to apply for student visas, work permits, and how to maintain legal status while studying abroad",
    imageUrl:
      "https://cdn.pixabay.com/photo/2014/08/27/08/07/blogging-428954_1280.jpg",
    blogLink: "#",
    author: {
      firstName: "Devon",
      lastName: "Lane",
      imageUrl:
        "https://cdn.pixabay.com/photo/2022/07/22/15/44/woman-7338402_1280.jpg",
    },
    createdAt: new Date(),
  },
  {
    title: "Scholarships",
    overview:
      "Find and apply for scholarships, grants, and funding opportunities to help cover tuition and living expenses.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2014/08/27/08/07/blogging-428954_1280.jpg",
    blogLink: "#",
    author: {
      firstName: "Wade",
      lastName: "Warren",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/02/13/18/46/model-3994985_1280.jpg",
    },
    createdAt: new Date(),
  },
];

const BlogPosts: React.FC = () => {
  return (
    <section className="bg-brand-50 space-y-2">
      <div className="flex items-center justify-between">
        <h2>Recent Blog Post</h2>
        <Link
          href="#"
          aria-label="View all blog posts"
          className="text-brand text-md font-bold"
        >
          view all
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {blogPosts.map((props) => (
          <Link
            key={props.title}
            href={props.blogLink}
            aria-label={`Link to ${props.title}'s blog post`}
          >
            <BlogPost {...props} />
          </Link>
        ))}
      </div>
    </section>
  );
};
export default BlogPosts;
