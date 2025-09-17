import { updatePayment } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const updatedPayment = await updatePayment(body);
    if (updatedPayment.error) {
      return NextResponse.json({ message: 'Failed to process webhook' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Webhook processed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing Xendit webhook:', error);
    return NextResponse.json({ message: 'Error processing webhook' }, { status: 500 });
  }
}
