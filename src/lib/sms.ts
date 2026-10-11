/**
 * Configuration for the SMS relay.
 *
 * NOTHING IS STORED. A message arrives at the webhook, is published straight
 * to Pusher, and is dropped. There is no database, no cache, no file, and no
 * module-level variable holding a message. The page keeps the current message
 * in React state only, so a reload clears it.
 *
 * Follows the same shape as `src/lib/contact.ts`: a typed getter per concern,
 * returning a discriminated union so callers cannot read half-configured
 * credentials by accident.
 *
 * Set these in `.env.local` locally and in the Vercel project settings for
 * deployments:
 *
 *   PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET, PUSHER_CLUSTER
 *   SMS_WEBHOOK_SECRET
 *   SMS_PAGE_USER, SMS_PAGE_PASSWORD
 */

/** Channel and event names, shared by the publisher and the subscriber. */
export const SMS_CHANNEL = "private-sms";
export const SMS_EVENT = "new-sms";

/** Hard caps on incoming fields. Longer values are truncated, not rejected. */
export const SMS_LIMITS = {
  from: 100,
  body: 2000,
} as const;

/** The payload published to the channel. */
export type SmsMessage = {
  from: string;
  body: string;
  /** Server-side UTC timestamp, ISO 8601. */
  received_at: string;
};

export type PusherConfig =
  | { isConfigured: false }
  | {
      isConfigured: true;
      appId: string;
      key: string;
      secret: string;
      cluster: string;
    };

/**
 * Full Pusher credentials. Server-side only: `secret` and `appId` must never
 * be sent to the browser.
 */
export function getPusherConfig(): PusherConfig {
  const appId = process.env.PUSHER_APP_ID;
  const key = process.env.PUSHER_KEY;
  const secret = process.env.PUSHER_SECRET;
  const cluster = process.env.PUSHER_CLUSTER;

  if (!appId || !key || !secret || !cluster) return { isConfigured: false };

  return { isConfigured: true, appId, key, secret, cluster };
}

/**
 * The only two values the browser is allowed to see. The key is a public
 * identifier by design; the secret and app id stay on the server.
 */
export function getPusherPublicConfig(): { key: string; cluster: string } | null {
  const key = process.env.PUSHER_KEY;
  const cluster = process.env.PUSHER_CLUSTER;

  if (!key || !cluster) return null;

  return { key, cluster };
}

/** Shared secret the iOS Shortcut must send as `X-Webhook-Secret`. */
export function getWebhookSecret(): string | null {
  return process.env.SMS_WEBHOOK_SECRET || null;
}

/** Basic Auth credentials guarding the page and the channel auth endpoint. */
export function getPageCredentials(): { user: string; password: string } | null {
  const user = process.env.SMS_PAGE_USER;
  const password = process.env.SMS_PAGE_PASSWORD;

  if (!user || !password) return null;

  return { user, password };
}
