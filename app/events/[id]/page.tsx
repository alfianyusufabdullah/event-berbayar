import { getEventById } from "@/lib/api";
import { notFound } from "next/navigation";
import { EventDetailContent } from "./EventDetailContent";

export default async function EventDetailPage(props: { params: Promise<{ id: string }>, searchParams: { status?: string } }) {
  const params = await props.params;
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  return <EventDetailContent event={event} />;
}
