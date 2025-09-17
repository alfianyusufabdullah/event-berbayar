import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getEvents } from "@/lib/api";
import dayjs from "dayjs";
import Link from "next/link";

export default async function Home() {
  const events = await getEvents();

  return (
    <main className="container mx-auto mt-10 px-28">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
              <CardDescription>
                {dayjs(event.eventStart).format("DD MMMM YYYY, HH:mm")} - {dayjs(event.eventEnd).format("HH:mm")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{event.summary}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="font-bold">Rp{event.price.toLocaleString("id-ID")}</p>
              <Link href={`/events/${event.id}`}>
                <Button>View Event</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}