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
      "After three denials, they stepped in and helped me get approved on the first try. They were cool, calm, and really understanding to work with. I can't recommend them enough!",
    name: "Godwin",
    title: "Google Business Review",
    imageUrl:
      "https://cdn.pixabay.com/photo/2023/07/25/10/21/girl-8148749_1280.jpg",
  },
  {
    comment:
      "What stood out the most was their genuine passion for connecting students to the best and affordable schools and customer satisfaction. It was evident that they genuinely cared about making my experience the best. I felt well taken care of throughout the entire journey, knowing that I had a reliable and professional team supporting me.",
    name: "Charles",
    title: "Google Business Review",
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/09/21/13/32/girl-2771936_1280.jpg",
  },
  {
    comment:
      "They are understanding and most time give you extra guidance on how to present a solid application. I had a little issue at some point, their team scheduled a series of meetings to help me out. Made me feel so important. 😁😁. I highly recommend them for Europe and North American universities and colleges.",
    name: "Oluwatimilehin ",
    title: "Google Business Review",
    imageUrl:
      "https://cdn.pixabay.com/photo/2018/06/04/22/55/books-3454398_1280.jpg",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="text-background space-y-5 bg-[url(/assets/images/backgrounds/students-1.png)]">
      <div className="space-y-2 text-center md:flex md:items-center md:justify-between md:space-y-0 md:text-left">
        <h2 className="md:flex-1">Our clients testimonials</h2>
        <p className="md:flex-1">
          Discover why students trust us to help them on their study abroad
          journey.
        </p>
      </div>
      <div>
        <Carousel>
          <CarouselContent>
            {testimonials.map(({ comment, name, imageUrl, title }, i) => (
              <CarouselItem
                key={`${name}_${i}_comment`}
                className="md:basis-2/3"
              >
                <Card className="bg-foreground border-brand-50/20">
                  <CardContent>
                    <div className="text-background grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Image
                        src={imageUrl}
                        alt={`${name}'s image'`}
                        width={100}
                        height={80}
                        className="h-[250px] w-full rounded-md object-cover"
                      />
                      <div className="flex flex-col justify-between space-y-4 md:space-y-0">
                        <p className="text-lg">{comment}</p>
                        <div>
                          <p className="text-sm font-bold">{name}</p>
                          <p className="text-sm">{title}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
