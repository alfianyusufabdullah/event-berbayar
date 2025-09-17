import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const events = [
  {
    title: "Tech Conference 2025",
    description: "An annual conference for developers and tech enthusiasts.",
    date: "October 26-28, 2025",
  },
  {
    title: "Design Summit",
    description: "A summit for designers to share ideas and inspiration.",
    date: "November 12, 2025",
  },
  {
    title: "Startup Pitch Day",
    description: "A chance for startups to pitch their ideas to investors.",
    date: "December 1, 2025",
  },
];

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Upcoming Events</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{event.description}</p>
            </CardContent>
            <CardFooter>
              <Button>View Event</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}