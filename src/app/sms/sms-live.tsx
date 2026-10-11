"use client";

import PusherClient from "pusher-js";
import { useEffect, useState } from "react";

import { SMS_CHANNEL, SMS_EVENT, type SmsMessage } from "@/lib/sms";
import { cn } from "@/lib/utils";

type ConnectionState = "connected" | "reconnecting" | "offline";

const indicator: Record<ConnectionState, { label: string; dot: string }> = {
  connected: { label: "Connected", dot: "bg-teal" },
  reconnecting: { label: "Reconnecting", dot: "bg-gold" },
  offline: { label: "Disconnected", dot: "bg-fg/40" },
};

/** Map Pusher's connection states onto the three we show. */
function toConnectionState(state: string): ConnectionState {
  if (state === "connected") return "connected";
  if (state === "connecting" || state === "unavailable") return "reconnecting";
  return "offline";
}

/** The channel should only ever carry our own payload, but check anyway. */
function isSmsMessage(value: unknown): value is SmsMessage {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.from === "string" &&
    typeof candidate.body === "string" &&
    typeof candidate.received_at === "string"
  );
}

function formatReceivedAt(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

type SmsLiveProps = {
  pusherKey: string;
  cluster: string;
};

/**
 * Subscribes to the private channel and shows the latest message.
 *
 * The message lives in React state and nowhere else: no localStorage, no
 * sessionStorage, no cookie, no module-level variable. Reloading the page
 * clears it, and only the most recent message is ever held.
 */
export function SmsLive({ pusherKey, cluster }: SmsLiveProps) {
  const [message, setMessage] = useState<SmsMessage | null>(null);
  const [connection, setConnection] = useState<ConnectionState>("reconnecting");

  useEffect(() => {
    const pusher = new PusherClient(pusherKey, {
      cluster,
      forceTLS: true,
      // Basic Auth on this endpoint is enforced by src/proxy.ts; the browser
      // replays the page's credentials on this same-origin request.
      authEndpoint: "/api/pusher-auth",
    });

    // Bound before subscribing so no transition is missed. A fresh client
    // starts in "connecting", which is what the default state already shows.
    pusher.connection.bind("state_change", (states: { current: string }) => {
      setConnection(toConnectionState(states.current));
    });

    const channel = pusher.subscribe(SMS_CHANNEL);

    channel.bind(SMS_EVENT, (data: unknown) => {
      if (isSmsMessage(data)) setMessage(data);
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(SMS_CHANNEL);
      pusher.connection.unbind_all();
      pusher.disconnect();
    };
  }, [pusherKey, cluster]);

  const status = indicator[connection];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2.5" aria-live="polite">
        <span
          aria-hidden="true"
          className={cn(
            "size-2 rounded-full",
            status.dot,
            connection === "reconnecting" && "animate-pulse",
          )}
        />
        <span className="font-sans text-[0.8125rem] text-fg/70">
          {status.label}
        </span>
      </div>

      <div
        className="edge min-h-[16rem] rounded-xl p-7 sm:p-9"
        aria-live="polite"
        aria-atomic="true"
      >
        {message ? (
          <article className="flex flex-col gap-5">
            <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-fg/10 pb-4">
              {/* Rendered as text by React, so markup in a message is shown
                  literally rather than parsed. */}
              <h2 className="font-display text-2xl text-fg">{message.from}</h2>
              <time
                dateTime={message.received_at}
                className="font-sans text-[0.8125rem] text-fg/65"
              >
                {formatReceivedAt(message.received_at)}
              </time>
            </header>

            <p className="body-copy whitespace-pre-wrap break-words text-fg/85">
              {message.body}
            </p>
          </article>
        ) : (
          <div className="flex min-h-[12rem] items-center justify-center">
            <p className="body-copy text-fg/60">Waiting for a message...</p>
          </div>
        )}
      </div>
    </div>
  );
}
