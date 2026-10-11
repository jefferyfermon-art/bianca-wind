import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { safeEqual } from "@/lib/safe-compare";
import { getPageCredentials } from "@/lib/sms";

/**
 * HTTP Basic Auth for the SMS relay.
 *
 * Covers the page and the channel authorization endpoint, so a visitor who
 * cannot open /sms cannot subscribe to the private channel either. The browser
 * replays Basic credentials on same-origin subrequests, which is what lets
 * `pusher-js` reach /api/pusher-auth without extra wiring.
 *
 * The webhook is deliberately NOT matched: it authenticates itself with
 * `X-Webhook-Secret` instead, because an iOS Shortcut posts to it directly.
 *
 * Note: `middleware.ts` is deprecated in this version of Next.js; `proxy.ts`
 * is the current convention. This runs on the Edge runtime, so everything here
 * uses Web APIs only.
 */

const REALM = 'Basic realm="Bianca Wind SMS", charset="UTF-8"';

function unauthorized() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": REALM,
      // Belt and braces alongside the page's own robots metadata.
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export async function proxy(request: NextRequest) {
  const credentials = getPageCredentials();

  // Fail closed. If the credentials are not configured the relay stays shut
  // rather than falling open to the public.
  if (!credentials) {
    console.error("sms proxy: SMS_PAGE_USER / SMS_PAGE_PASSWORD are not set");
    return new NextResponse("Not configured.", {
      status: 503,
      headers: { "X-Robots-Tag": "noindex, nofollow" },
    });
  }

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return unauthorized();

  let decoded: string;
  try {
    decoded = atob(header.slice("Basic ".length));
  } catch {
    return unauthorized();
  }

  // Only the first colon separates the two: a password may contain colons.
  const separator = decoded.indexOf(":");
  if (separator === -1) return unauthorized();

  const user = decoded.slice(0, separator);
  const password = decoded.slice(separator + 1);

  // Both comparisons always run, so a correct username with a wrong password
  // costs the same as a wrong username.
  const [userOk, passwordOk] = await Promise.all([
    safeEqual(user, credentials.user),
    safeEqual(password, credentials.password),
  ]);

  if (!userOk || !passwordOk) return unauthorized();

  return NextResponse.next();
}

export const config = {
  matcher: ["/sms", "/api/pusher-auth"],
};
