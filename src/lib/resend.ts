import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn('RESEND_API_KEY not found in environment variables. Email sending will fail.');
}

export const resend = new Resend(resendApiKey);

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'pedidos@vapapp.com';
