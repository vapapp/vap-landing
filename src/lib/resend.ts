import { Resend } from 'resend';

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'pedidos@vapapp.com';

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY not found in environment variables.');
    }
    _resend = new Resend(apiKey);
  }
  return _resend;
}

// Backward-compatible named export (lazy proxy)
export const resend = new Proxy({} as Resend, {
  get(_target, prop) {
    return (getResend() as unknown as Record<string, unknown>)[prop as string];
  },
});
