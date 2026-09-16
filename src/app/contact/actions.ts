"use server";

import { brand } from "@/content/site";
import { getContactConfig } from "@/lib/contact";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
};

export const initialContactState: ContactFormState = { status: "idle" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContactForm(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const config = getContactConfig();

  if (!config.isConfigured) {
    return {
      status: "error",
      message:
        "This form is not accepting messages yet. Please try again another time.",
    };
  }

  // Honeypot: real people leave this hidden field empty.
  if (readField(formData, "company")) {
    return { status: "success", message: "Thank you — your message was sent." };
  }

  const name = readField(formData, "name");
  const email = readField(formData, "email");
  const message = readField(formData, "message");

  const fieldErrors: ContactFormState["fieldErrors"] = {};

  if (name.length < 2) fieldErrors.name = "Please enter your name.";
  if (name.length > 100) fieldErrors.name = "That name is a little too long.";
  if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Please enter an email address we can reply to.";
  }
  if (message.length < 10) {
    fieldErrors.message = "Please write a little more so the message makes sense.";
  }
  if (message.length > 5000) {
    fieldErrors.message = "Please keep the message under 5,000 characters.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.inbox],
        reply_to: email,
        subject: `New message from ${name} via the ${brand.name} website`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!response.ok) {
      console.error(
        "Contact form delivery failed",
        response.status,
        await response.text(),
      );
      return {
        status: "error",
        message:
          "Something went wrong sending that. Please try again in a moment.",
      };
    }
  } catch (error) {
    console.error("Contact form delivery threw", error);
    return {
      status: "error",
      message:
        "Something went wrong sending that. Please try again in a moment.",
    };
  }

  return {
    status: "success",
    message: "Thank you — your message was sent.",
  };
}
