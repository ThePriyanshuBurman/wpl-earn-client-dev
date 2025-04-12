import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformDescription = (description : string) => {
  if (!description) return "";
  // Replace <u> tags with <a> tags for URLs
  const transformed = description
    .replace(/<u>(https?:\/\/[^\s<]+)<\/u>/g, (match, url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">${url}</a>`;
    })
    // Replace newlines with <br> tags
    .replace(/\\n/g, "<br>")
    // Remove extra quotes if needed
    .replace(/"/g, "");

  return transformed;
};