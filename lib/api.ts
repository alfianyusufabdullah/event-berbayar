import { fetchWithAuth } from "@/lib/utils";

export interface Event {
  id: string;
  name: string;
  description: string;
  eventStart: string;
  eventEnd: string;
  price: number;
}

export async function getEvents(): Promise<Event[]> {
  const response = await fetchWithAuth("https://n8n-sandbox.lokalan.space/webhook/devcoach/events", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const data = await response.json();
  
  // The API returns a single object, but we will wrap it in an array to handle it as a list.
  return Array.isArray(data) ? data : [data];
}
