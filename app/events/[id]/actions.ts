'use server';

import { z } from 'zod';
import { registerEvent } from '@/lib/api';

const registrationSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export type RegistrationState = {
  message: string;
  error: boolean;
  paymentUrl?: string;
};

export async function registerForEvent(
  prevState: RegistrationState,
  formData: FormData
): Promise<RegistrationState> {
  const eventId = formData.get('eventId') as string;
  const validatedFields = registrationSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.email?.[0] || validatedFields.error.flatten().fieldErrors.name?.[0] || 'Invalid data',
      error: true,
    };
  }

  try {
    const result = await registerEvent(
      validatedFields.data.name,
      validatedFields.data.email,
      eventId
    );

    if (result.error) {
      return {
        message: result.message,
        error: true,
      };
    }

    return {
      message: result.message,
      error: false,
      paymentUrl: result.paymentUrl,
    };
  } catch (error) {
    console.log(`Error during registration: ${error}`);
    return {
      message: 'An unexpected error occurred. Please try again.',
      error: true,
    };
  }
}
