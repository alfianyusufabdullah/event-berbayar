import { RegisterButton } from "@/components/RegisterButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getEventById } from "@/lib/api";
import dayjs from "dayjs";
import { notFound } from "next/navigation";

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

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
                    <RegisterButton eventId={event.id} />
        </CardFooter>
      </Card>
    </main>
  );
}