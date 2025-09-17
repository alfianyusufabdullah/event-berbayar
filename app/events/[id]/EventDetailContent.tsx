'use client';

import { RegisterButton } from "@/components/RegisterButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getEventById } from "@/lib/api"; // Import getEventById to use its return type
import dayjs from "dayjs";
import { notFound, useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface EventDetailContentProps {
  event: Awaited<ReturnType<typeof getEventById>>; 
}

export function EventDetailContent({ event }: EventDetailContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");

  useEffect(() => {
    const status = searchParams.get("status");
    if (status) {
      if (status === "success") {
        setDialogTitle("Pembayaran Berhasil!");
        setDialogMessage("Pembayaran Anda telah berhasil diproses.");
      } else if (status === "failed") {
        setDialogTitle("Pembayaran Gagal!");
        setDialogMessage("Pembayaran Anda gagal. Mohon coba lagi.");
      }
      setShowDialog(true);

      // Remove the status param from the URL
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("status");
      router.replace(`${pathname}?${newSearchParams.toString()}`);
    }
  }, [searchParams, router, pathname]);

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

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Tutup
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
