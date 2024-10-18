import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import { SubscriptionStatusType } from "./typeguards";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music",
  },
  // {
  //   label: "Image Generation",
  //   icon: ImageIcon,
  //   color: "text-pink-700",
  //   bgColor: "bg-pink-700/10",
  //   href: "/image",
  // },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video",
  },
  // {
  //   label: "Code Generation",
  //   icon: Code,
  //   color: "text-green-700",
  //   bgColor: "bg-green-700/10",
  //   href: "/code",
  // },
];

export function convertToCurrency(
  priceInBaseUnit: string,
  currencySymbol: string,
): string {
  const parsedPrice = parseInt(priceInBaseUnit);
  const priceInCurrency = parsedPrice / 100;
  return `${currencySymbol}${priceInCurrency.toFixed(2)}`;
}

export function formatPrice(
  priceInCents: string,
  locale: string,
  currency: string,
) {
  const price = parseFloat(priceInCents);
  const countryCurrency = price / 100;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    // Use minimumFractionDigits to handle cases like $59.00 -> $59
    minimumFractionDigits: countryCurrency % 1 !== 0 ? 2 : 0,
  }).format(countryCurrency);
}

export function formatDate(date: string | number | Date | null | undefined) {
  if (!date) return "";

  return new Date(date).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function isValidSubscription(status: SubscriptionStatusType) {
  return status !== "cancelled" && status !== "expired" && status !== "unpaid";
}
