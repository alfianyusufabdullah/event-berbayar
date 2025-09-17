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
            <img src="https://placehold.co/600x400" alt="Placeholder Image" className="mb-4 rounded-md" />
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
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Harga Tiket
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Informasi pendaftaran dan pembayaran event.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 border-t border-gray-200 dark:border-gray-700">
            {!showRegistrationForm ? (
              <div className="flex flex-col gap-4 items-center text-center">
                <p className="text-md text-gray-700 dark:text-gray-300">{event.summary}</p>
                <p className="text-4xl font-bold text-indigo-600 py-2">
                  Rp{event.price.toLocaleString("id-ID")}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Jangan lewatkan kesempatan ini!</p>
                <Button onClick={handleRegisterClick} className="w-full py-5 text-lg">
                  Daftar Sekarang
                </Button>
              </div>
            ) : (
              <form action={formAction} className="flex flex-col gap-5">
                <input type="hidden" name="eventId" value={event.id} />
                <p className="text-4xl font-bold text-indigo-600 text-center">
                  Rp{event.price.toLocaleString("id-ID")}
                </p>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nama Lengkap Anda"
                    required
                    className="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email@example.com"
                    required
                    className="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Invoice pembayaran akan dikirimkan ke email ini. Pastikan email yang dimasukkan benar.
                  </p>
                </div>
                {state.error && (
                  <p className="text-red-600 text-sm text-center font-medium mt-2">{state.message}</p>
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
