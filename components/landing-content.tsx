"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Jean",
    avatar: "J",
    title: "Software Engineer",
    description: "This AI application is the best I've used so far",
  },
  {
    name: "Mike",
    avatar: "M",
    title: "Developer Relations",
    description: "This AI application is the best I've used so far",
  },
  {
    name: "Ricky",
    avatar: "R",
    title: "Tech Enthusiast",
    description: "This AI application is the best I've used so far",
  },
  {
    name: "Naomi",
    avatar: "N",
    title: "Software Engineer",
    description: "This AI application is the best I've used so far",
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
            className="border-none bg-[#192339] text-white"
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
