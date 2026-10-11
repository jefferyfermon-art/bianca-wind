import type { NextRequest } from "next/server";

import { getPusherServer } from "@/lib/pusher-server";
import { SMS_CHANNEL } from "@/lib/sms";

/**
 * POST /api/pusher-auth
 *
 * Channel authorization for the private channel. `pusher-js` calls this with
 * `socket_id` and `channel_name`, and expects the signed auth payload back.
 *
 * Access is gated by the same Basic Auth as /sms, enforced in `src/proxy.ts`.
 * The browser replays those credentials on this same-origin request, so
 * anyone who cannot open the page cannot subscribe to the channel either.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const pusher = getPusherServer();
  if (!pusher) {
    console.error("pusher-auth: Pusher credentials are not fully set");
    return Response.json({ error: "not configured" }, { status: 503 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }

  const socketId = form.get("socket_id");
  const channelName = form.get("channel_name");

  if (typeof socketId !== "string" || typeof channelName !== "string") {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }

  // Authorize exactly one channel. Without this the endpoint would sign any
  // channel name a caller asked for.
  if (channelName !== SMS_CHANNEL) {
    return Response.json({ error: "forbidden channel" }, { status: 403 });
  }

  const auth = pusher.authorizeChannel(socketId, channelName);

  return Response.json(auth);
}
