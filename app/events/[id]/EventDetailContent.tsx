'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Markdown from 'markdown-to-jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getEventById } from "@/lib/api"; // Import getEventById to use its return type
import dayjs from "dayjs";
import { notFound, useRouter, useSearchParams, usePathname } from "next/navigation";
import { registerForEvent, RegistrationState } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Registering...' : 'Daftar'}
    </Button>
  );
}

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
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const initialState: RegistrationState = { message: '', error: false, paymentUrl: '' };
  const [state, formAction] = useActionState(registerForEvent, initialState);

  useEffect(() => {
    if (state.paymentUrl) {
      window.location.href = state.paymentUrl;
    }
  }, [state]);

  useEffect(() => {
    const status = searchParams.get("status");
    if (status) {
      if (status === "success") {
        setDialogTitle("Pembayaran Berhasil!");
        setDialogMessage("Pembayaran Anda telah berhasil diproses. Silakan periksa email Anda untuk detail lebih lanjut.");
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

  const handleRegisterClick = () => {
    setShowRegistrationForm(true);
  };

  return (
    <main className="container mx-auto px-28 mt-10 flex gap-8">
      {/* Left Section: Event Content (70%) */}
      <div className="w-4/6">
        <Card className='mb-6'>
          <CardHeader>
            <CardTitle className="text-4xl font-bold">{event.name}</CardTitle>
            <CardDescription>
              {dayjs(event.eventStart).format("DD MMMM YYYY, HH:mm")} - {dayjs(event.eventEnd).format("HH:mm")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='prose min-w-full'>
              <Markdown>{event.description}</Markdown>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Section: Price / Registration Form (30%) */}
      <div className="w-2/6">
        <Card className='sticky top-7'>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Harga Tiket</CardTitle>
          </CardHeader>
          <CardContent>
            {!showRegistrationForm ? (
              <div className="flex flex-col gap-4">
                <p className="text-3xl font-bold">Rp{event.price.toLocaleString("id-ID")}</p>
                <Button onClick={handleRegisterClick} className="w-full">
                  Daftar Sekarang
                </Button>
              </div>
            ) : (
              <form action={formAction} className="flex flex-col gap-4">
                <input type="hidden" name="eventId" value={event.id} />
                <p className="text-3xl font-bold">Rp{event.price.toLocaleString("id-ID")}</p>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nama Lengkap Anda"
                    required
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                {state.error && (
                  <p className="text-red-500 text-sm text-center mb-4">{state.message}</p>
                )}
                <SubmitButton />
              </form>
            )}
          </CardContent>
        </Card>
      </div>

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
