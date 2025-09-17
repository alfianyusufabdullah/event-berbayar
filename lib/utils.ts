import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const headers = new Headers(options.headers);
  headers.append("CF-Access-Client-Id", process.env.CF_ACCESS_CLIENT_ID || "");
  headers.append("CF-Access-Client-Secret", process.env.CF_ACCESS_CLIENT_SECRET || "");

  const newOptions: RequestInit = {
    ...options,
    headers,
  };

  return fetch(url, newOptions);
}
