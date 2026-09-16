/**
 * Contact delivery configuration.
 *
 * The contact form is only rendered when a real destination exists. That keeps
 * the site honest: visitors are never shown a form that quietly goes nowhere.
 *
 * To switch it on, set these environment variables (locally in `.env.local`,
 * and in the Vercel project settings for deployments):
 *
 *   RESEND_API_KEY   API key from https://resend.com
 *   CONTACT_INBOX    Address that should receive messages
 *   CONTACT_FROM     Verified sender, e.g. "Bianca Wind <hello@example.com>"
 */
export type ContactConfig =
  | { isConfigured: false }
  | { isConfigured: true; apiKey: string; inbox: string; from: string };

export function getContactConfig(): ContactConfig {
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.CONTACT_INBOX;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !inbox || !from) return { isConfigured: false };

  return { isConfigured: true, apiKey, inbox, from };
}
