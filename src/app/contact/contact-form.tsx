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
  "w-full rounded-md border border-fg/20 bg-panel/70 px-4 py-3 text-[0.9375rem] text-fg transition-colors placeholder:text-fg/40 hover:border-fg/35 focus:border-teal focus:outline-none";

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
    <p id={id} className="text-sm text-fg/80">
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
        className="rounded-lg border border-fg/15 bg-panel/50 p-8"
      >
        <h2 className="font-display text-2xl text-fg">Message sent</h2>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg/75">
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
          className="rounded-md border border-fg/20 bg-panel/60 px-4 py-3 text-sm text-fg"
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-fg">
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
          className={cn(fieldClass, state.fieldErrors?.name && "border-fg/60")}
        />
        <FieldError id="name-error">{state.fieldErrors?.name}</FieldError>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-fg">
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
          className={cn(fieldClass, state.fieldErrors?.email && "border-fg/60")}
        />
        <FieldError id="email-error">{state.fieldErrors?.email}</FieldError>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-fg">
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
            state.fieldErrors?.message && "border-fg/60",
          )}
        />
        <FieldError id="message-error">{state.fieldErrors?.message}</FieldError>
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
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
