import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";

// Dummy data for a single event
const event = {
  id: "event-1223",
  name: "DevCoach 1",
  description: "Ini adalah devCoach 1",
  eventStart: "9/17/2025 15:30:00",
  eventEnd: "9/17/2025 17:30:00",
  price: 57000,
};

export default function EventDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold">{event.name}</CardTitle>
          <CardDescription>
            {dayjs(event.eventStart).format("DD MMMM YYYY, HH:mm")} - {dayjs(event.eventEnd).format("HH:mm")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{event.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <p className="text-2xl font-bold">Rp{event.price.toLocaleString("id-ID")}</p>
          <Button size="lg">Register for this Event</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
