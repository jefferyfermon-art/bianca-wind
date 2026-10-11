import Pusher from "pusher";

import { getPusherConfig } from "@/lib/sms";

/**
 * Server-side Pusher client.
 *
 * Created lazily and reused across invocations on a warm serverless instance.
 * This holds a connection, never a message: nothing that passes through it is
 * retained.
 */
let client: Pusher | null = null;

export function getPusherServer(): Pusher | null {
  const config = getPusherConfig();
  if (!config.isConfigured) return null;

  if (!client) {
    client = new Pusher({
      appId: config.appId,
      key: config.key,
      secret: config.secret,
      cluster: config.cluster,
      useTLS: true,
    });
  }

  return client;
}
