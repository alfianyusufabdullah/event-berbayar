import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getEvents } from "@/lib/api";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const events = await getEvents();

  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl md:text-6xl">
          Discover Your Next Experience
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Browse through a variety of events and find something that excites you.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link href="#events">
              <Button size="lg">Explore Events</Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="events" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 text-center mb-12">
          Upcoming Events
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 p-0">
              <div className="p-0">
                <Image
                  src="https://picsum.photos/id/8/600/400"
                  alt="Placeholder Image"
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-bold">{event.name}</CardTitle>
                <CardDescription className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {dayjs(event.eventStart).format("DD MMMM YYYY, HH:mm")} - {dayjs(event.eventEnd).format("HH:mm")}
                </CardDescription>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{event.summary}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-6 bg-gray-50 dark:bg-gray-800">
                <p className="font-bold text-lg">Rp{event.price.toLocaleString("id-ID")}</p>
                <Link href={`/events/${event.id}`}>
                  <Button>View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
