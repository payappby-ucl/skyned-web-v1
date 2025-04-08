"use client";
import Image from "next/image";
import React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@workspace/ui/components/avatar";
import dayjs from "dayjs";
import { Dot } from "lucide-react";

interface Props {
  title: string;
  overview: string;
  imageUrl: string;
  blogLink: string;
  author: {
    firstName: string;
    lastName: string;
    imageUrl: string;
  };
  createdAt: Date;
}

const BlogPost: React.FC<Props> = ({
  title,
  author,
  overview,
  imageUrl,
  createdAt,
}) => {
  return (
    <div>
      <Image
        src={imageUrl}
        alt={`${title} blog post image`}
        width={100}
        height={80}
        className="w-full rounded-t-md"
      />
      <div className="bg-background space-y-2 rounded-b-lg p-4">
        <h3 className="mt-2 !text-lg">{title}</h3>
        <p className="text-md">{overview}</p>
        <div
          className="flex items-center gap-2"
          aria-label="Author's Information"
        >
          <Avatar>
            <AvatarImage
              src={author.imageUrl}
              alt={`${title} blog post author's image`}
            />
            <AvatarFallback>{`${author.firstName[0]?.toUpperCase()}${author.lastName[0]?.toUpperCase()}`}</AvatarFallback>
          </Avatar>
          <p arial-label="Author's Name" className="text-sm">
            {author.firstName} {author.lastName}
          </p>
          <Dot />
          <time
            dateTime={dayjs(createdAt).format("YYYY-MM-DD")}
            className="text-sm"
          >
            {dayjs(createdAt).format("MMM DD, YYYY")}
          </time>
        </div>
      </div>
    </div>
  );
};
export default BlogPost;
