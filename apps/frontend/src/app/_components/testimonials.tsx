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
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-foreground text-background space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="flex-1">Our clients testimonials</h2>
        <p className="flex-1">
          Lorem ipsum dolor sit amet consectetur. Ornare lacus quis tempus massa
          dignissim quisque. Sagittis fusce vestibu.
        </p>
      </div>
      <div>
        <Carousel>
          <CarouselContent>
            {testimonials.map(
              ({ comment, firstName, lastName, imageUrl, title }, i) => (
                <CarouselItem key={`${firstName}${lastName}_${i}_comment`}>
                  <Card className="bg-foreground border-brand-50/20">
                    <CardContent>
                      <div>
                        <Image
                          src={imageUrl}
                          alt={`${firstName}${lastName}'s image'`}
                          width={100}
                          height={80}
                          className="rounded-md"
                        />
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
