'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Markdown from 'markdown-to-jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getEventById } from "@/lib/api";
import dayjs from "dayjs";
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(weekday);
import { notFound, useRouter, useSearchParams, usePathname } from "next/navigation";
import { registerForEvent, RegistrationState } from './actions';
import { CalendarIcon, ClockIcon, TagIcon, UserIcon, MailIcon } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full py-6 text-lg font-semibold">
      {pending ? 'Registering...' : 'Secure Your Spot'}
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
        setDialogTitle("Payment Successful!");
        setDialogMessage("Your payment has been processed successfully. Please check your email for further details.");
      } else if (status === "failed") {
        setDialogTitle("Payment Failed!");
        setDialogMessage("Your payment failed. Please try again.");
      }
      setShowDialog(true);

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
    <main className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat h-80 md:h-[500px] flex items-center justify-center text-white rounded-b-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
        <img src="https://picsum.photos/1920/1080" alt={event.name} className="absolute inset-0 w-full h-full object-cover -z-10" />
        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight break-words max-w-4xl mx-auto leading-tight">{event.name}</h1>
          <div className="mt-6 flex items-center justify-center text-lg md:text-xl space-x-6 text-gray-200">
            <div className="flex items-center">
              <CalendarIcon className="h-6 w-6 mr-2.5" />
              <span>{dayjs(event.eventStart).format("dddd, DD MMMM YYYY")}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-6 w-6 mr-2.5" />
              <span>{dayjs(event.eventStart).format("HH:mm")} - {dayjs(event.eventEnd).format("HH:mm")} WIB</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-[-4rem] z-20 relative">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section: Event Content */}
          <div className="w-full lg:w-2/3">
            <Card className='mb-6 shadow-lg'>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">About the Event</h2>
                
                <div className='prose prose-lg max-w-none dark:prose-invert'>
                  <Markdown>{event.description}</Markdown>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section: Price / Registration Form */}
          <div className="w-full lg:w-1/3">
            <Card className='sticky top-28 shadow-lg'>
              <CardContent className="p-6">
                {!showRegistrationForm ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                        <TagIcon className="h-6 w-6 mr-2 text-indigo-500" />
                        <CardTitle className="text-2xl font-bold">
                        Grab Your Ticket
                        </CardTitle>
                    </div>
                    <p className="text-5xl font-extrabold text-indigo-600 my-4">
                      Rp{event.price.toLocaleString("id-ID")}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{event.summary}</p>
                    <Button onClick={handleRegisterClick} size="lg" className="w-full py-6 text-lg font-semibold">
                      Register Now
                    </Button>
                  </div>
                ) : (
                  <form action={formAction} className="flex flex-col gap-6">
                    <input type="hidden" name="eventId" value={event.id} />
                    <div className="text-center">
                        <p className="text-4xl font-bold text-indigo-600">
                        Rp{event.price.toLocaleString("id-ID")}
                        </p>
                    </div>
                    <div className="grid w-full items-center gap-2.5">
                      <Label htmlFor="name" className="flex items-center text-md font-medium"><UserIcon className='h-4 w-4 mr-2'/>Full Name</Label>
                      <Input type="text" id="name" name="name" placeholder="Enter your full name" required />
                    </div>
                    <div className="grid w-full items-center gap-2.5">
                      <Label htmlFor="email" className="flex items-center text-md font-medium"><MailIcon className='h-4 w-4 mr-2'/>Email Address</Label>
                      <Input type="email" id="email" name="email" placeholder="your.email@example.com" required />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Your invoice will be sent to this email address.
                      </p>
                    </div>
                    {state.error && (
                      <p className="text-red-500 text-sm text-center font-medium">{state.message}</p>
                    )}
                    <SubmitButton />
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold'>{dialogTitle}</DialogTitle>
            <DialogDescription className='mt-2'>{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
