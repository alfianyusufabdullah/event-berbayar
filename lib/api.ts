import { fetchWithAuth } from "@/lib/utils";

export interface Event {
  id: string;
  name: string;
  description: string;
  summary: string;
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
  return Array.isArray(data) ? data : [data];
}

export async function getEventById(id: string): Promise<Event | null> {
  const response = await fetchWithAuth(`https://n8n-sandbox.lokalan.space/webhook/devcoach/events?id=${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error("Failed to fetch event");
  }

  const data = await response.json();

  if (!data) {
    return null;
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return null;
    }
    return data[0];
  }

  if (Object.keys(data).length === 0) {
    return null;
  }

  return data;
}

export async function registerEvent(name: string, email: string, eventId: string) {
  const response = await fetchWithAuth('https://n8n-sandbox.lokalan.space/webhook/devcoach/registration/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      eventId,
      appUrl: process.env.APP_URL || 'http://localhost:3000',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to register for the event.');
  }

  return response.json();
}

export async function updatePayment(payload: Invoice) {
  const response = await fetchWithAuth('https://n8n-sandbox.lokalan.space/webhook/devcoach/invoices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload, null, 2),
  });

  if (!response.ok) {
    throw new Error('Failed to register for the event.');
  }

  return response.json();
}