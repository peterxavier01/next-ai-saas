"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah T",
    avatar: "S",
    title: "Data Scientist",
    description: "This AI app has transformed the way I work. The accuracy and speed are unmatched! Highly recommend for anyone looking to boost productivity.",
  },
  {
    name: "John M.",
    avatar: "J",
    title: "Developer Relations",
    description: "I was blown away by how intuitive and easy it is to use. It handles complex tasks effortlessly. A game-changer for professionals!",
  },
  {
    name: "Dr. Emily S.",
    avatar: "E",
    title: "Researcher",
    description: "This AI application is thef best I've used so far",
  },
  {
    name: "Alex P.",
    avatar: "A",
    title: "Software Engineer",
    description: "The AI capabilities are top-notch. It saved me hours of manual work, and the results were flawless. Definitely worth using!",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="mb-10 text-center text-4xl font-extrabold text-white">
        Testimonials
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {testimonials.map((item) => (
          <Card
            key={item.avatar}
            className="border-none bg-[hsl(0,0%,10%)] text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-sm text-zinc-400">{item.title}</p>
                </div>
              </CardTitle>

              <CardContent className="px-0 pt-4">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
