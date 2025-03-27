import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@workspace/ui/components/carousel";
import Image from "next/image";
import React from "react";

const testimonials = [
  {
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud",
    firstName: "Sameer",
    lastName: "Rai",
    title: "Product Head",
    imageUrl:
      "https://cdn.pixabay.com/photo/2023/07/25/10/21/girl-8148749_1280.jpg",
  },
  {
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud",
    firstName: "Rosemary J.",
    lastName: "Castillo",
    title: "Textile cutting machine operator",
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/09/21/13/32/girl-2771936_1280.jpg",
  },
  {
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud",
    firstName: "Debbie T.",
    lastName: "McDonough",
    title: "Floral designer",
    imageUrl:
      "https://cdn.pixabay.com/photo/2018/06/04/22/55/books-3454398_1280.jpg",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-foreground text-background space-y-5">
      <div className="space-y-2 text-center md:flex md:items-center md:justify-between md:space-y-0 md:text-left">
        <h2 className="md:flex-1">Our clients testimonials</h2>
        <p className="md:flex-1">
          Lorem ipsum dolor sit amet consectetur. Ornare lacus quis tempus massa
          dignissim quisque. Sagittis fusce vestibu.
        </p>
      </div>
      <div>
        <Carousel>
          <CarouselContent>
            {testimonials.map(
              ({ comment, firstName, lastName, imageUrl, title }, i) => (
                <CarouselItem
                  key={`${firstName}${lastName}_${i}_comment`}
                  className="md:basis-2/3"
                >
                  <Card className="bg-foreground border-brand-50/20">
                    <CardContent>
                      <div className="text-background grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Image
                          src={imageUrl}
                          alt={`${firstName}${lastName}'s image'`}
                          width={100}
                          height={80}
                          className="h-[250px] w-full rounded-md object-cover"
                        />
                        <div className="flex flex-col justify-between space-y-4 md:space-y-0">
                          <p className="text-lg">{comment}</p>
                          <div>
                            <p className="text-sm font-bold">
                              {firstName} {lastName}
                            </p>
                            <p className="text-sm">{title}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ),
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
