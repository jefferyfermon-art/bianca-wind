"use client";

import { Send } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  initialContactState,
  submitContactForm,
  type ContactFormState,
} from "./actions";

const fieldClass =
  "w-full rounded-md border border-ink/20 bg-white/70 px-4 py-3 text-[0.9375rem] text-ink transition-colors placeholder:text-ink/40 hover:border-ink/35 focus:border-teal focus:outline-none";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Sending…" : "Send message"}
      <Send aria-hidden="true" className="size-4" />
    </Button>
  );
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;

  return (
    <p id={id} className="text-sm text-ink/80">
      {children}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    initialContactState,
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-ink/15 bg-mist/50 p-8"
      >
        <h2 className="font-serif text-2xl text-ink">Message sent</h2>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/75">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="rounded-md border border-ink/20 bg-mist/60 px-4 py-3 text-sm text-ink"
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          aria-invalid={state.fieldErrors?.name ? true : undefined}
          className={cn(fieldClass, state.fieldErrors?.name && "border-ink/60")}
        />
        <FieldError id="name-error">{state.fieldErrors?.name}</FieldError>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          aria-invalid={state.fieldErrors?.email ? true : undefined}
          className={cn(fieldClass, state.fieldErrors?.email && "border-ink/60")}
        />
        <FieldError id="email-error">{state.fieldErrors?.email}</FieldError>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={7}
          required
          aria-describedby={
            state.fieldErrors?.message ? "message-error" : undefined
          }
          aria-invalid={state.fieldErrors?.message ? true : undefined}
          className={cn(
            fieldClass,
            "resize-y",
            state.fieldErrors?.message && "border-ink/60",
          )}
        />
        <FieldError id="message-error">{state.fieldErrors?.message}</FieldError>
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
