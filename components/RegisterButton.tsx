'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerForEvent, RegistrationState } from '@/app/events/[id]/actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Registering...' : 'Register'}
    </Button>
  );
}

export function RegisterButton({ eventId }: { eventId: string }) {
  const initialState: RegistrationState = { message: '', error: false, paymentUrl: '' };
  const [state, formAction] = useActionState(registerForEvent, initialState);

  useEffect(() => {
    if (state.paymentUrl) {
      window.location.href = state.paymentUrl;
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">Register for this Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <input type="hidden" name="eventId" value={eventId} />
          <DialogHeader>
            <DialogTitle>Register for Event</DialogTitle>
            <DialogDescription>
              Fill in your details to register for this event.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" name="email" type="email" className="col-span-3" required />
            </div>
          </div>
          {state.error && (
            <p className="text-red-500 text-sm text-center mb-4">{state.message}</p>
          )}
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
