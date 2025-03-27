import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export { z } from "zod";
export { zodResolver } from "@hookform/resolvers/zod";
export * from "react-hook-form";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
