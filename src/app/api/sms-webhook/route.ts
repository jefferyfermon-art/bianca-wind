import type { NextRequest } from "next/server";

import { getPusherServer } from "@/lib/pusher-server";
import { safeEqual } from "@/lib/safe-compare";
import {
  SMS_CHANNEL,
  SMS_EVENT,
  SMS_LIMITS,
  getWebhookSecret,
  type SmsMessage,
} from "@/lib/sms";

/**
 * POST /api/sms-webhook
 *
 * Receives one forwarded SMS from the iOS Shortcuts automation, publishes it
 * to the realtime channel, and forgets it. Nothing is written to a database,
 * a cache, a file, or a module-level variable.
 *
 * Logging rule: never log the shared secret and never log message content.
 * Failures are logged by category only.
 */

/** The `pusher` package is Node-only, so this must not run on the Edge. */
export const runtime = "nodejs";

/** Reads a request header and publishes, so it can never be prerendered. */
export const dynamic = "force-dynamic";

function badRequest(reason: string) {
  return Response.json({ ok: false, error: reason }, { status: 400 });
}

export async function POST(request: NextRequest) {
  const expectedSecret = getWebhookSecret();
  const providedSecret = request.headers.get("x-webhook-secret");

  if (!expectedSecret) {
    console.error("sms-webhook: SMS_WEBHOOK_SECRET is not set");
    return Response.json({ ok: false, error: "not configured" }, { status: 503 });
  }

  // Constant-time, and still run the comparison when the header is absent so
  // a missing header and a wrong header cost the same.
  const secretOk = await safeEqual(providedSecret ?? "", expectedSecret);
  if (!providedSecret || !secretOk) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return badRequest("body must be JSON");
  }

  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return badRequest("body must be a JSON object");
  }

  const { from, body } = payload as Record<string, unknown>;

  if (typeof from !== "string" || typeof body !== "string") {
    return badRequest("'from' and 'body' are both required strings");
  }

  const pusher = getPusherServer();
  if (!pusher) {
    console.error("sms-webhook: Pusher credentials are not fully set");
    return Response.json({ ok: false, error: "not configured" }, { status: 503 });
  }

  const message: SmsMessage = {
    from: from.slice(0, SMS_LIMITS.from),
    body: body.slice(0, SMS_LIMITS.body),
    received_at: new Date().toISOString(),
  };

  try {
    // Awaited: the 200 means the message actually reached the channel.
    await pusher.trigger(SMS_CHANNEL, SMS_EVENT, message);
  } catch {
    // Deliberately not logging the error object: it can echo the payload.
    console.error("sms-webhook: publish to the realtime channel failed");
    return Response.json({ ok: false, error: "publish failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
