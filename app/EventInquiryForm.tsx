"use client";

import { FormEvent, useState } from "react";

export default function EventInquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(
          Array.from(formData.entries()).map(([key, value]) => [
            key,
            String(value),
          ]),
        ).toString(),
      });

      if (!response.ok) {
        throw new Error("The inquiry could not be submitted.");
      }

      window.location.assign("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      className="inquiry-form"
      name="event-inquiry"
      method="POST"
      action="/__forms.html"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="event-inquiry" />
      <p className="honeypot">
        <label>
          Don’t fill this out if you’re human:
          <input name="bot-field" />
        </label>
      </p>

      <div className="form-heading">
        <div>
          <span className="form-step">01</span>
          <h3>Tell us about your gathering.</h3>
        </div>
        <p>
          Share what you know now. We’ll follow up to shape the menu, service,
          and details together.
        </p>
      </div>

      <div className="form-grid">
        <label className="form-field">
          <span>Name *</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            required
          />
        </label>

        <label className="form-field">
          <span>Email *</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="form-field">
          <span>Phone</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="Best number to reach you"
          />
        </label>

        <label className="form-field">
          <span>Business or organization</span>
          <input
            type="text"
            name="organization"
            autoComplete="organization"
            placeholder="Optional"
          />
        </label>

        <label className="form-field">
          <span>Event type *</span>
          <select name="event-type" defaultValue="" required>
            <option value="" disabled>
              Select one
            </option>
            <option value="private-party">Private party</option>
            <option value="business-pop-up">Business pop-up</option>
            <option value="corporate-event">Corporate event</option>
            <option value="community-event">Community event</option>
            <option value="market-or-festival">Market or festival</option>
            <option value="other">Something else</option>
          </select>
        </label>

        <label className="form-field">
          <span>Preferred date *</span>
          <input type="date" name="event-date" required />
        </label>

        <label className="form-field">
          <span>Location *</span>
          <input
            type="text"
            name="location"
            placeholder="Venue or neighborhood"
            required
          />
        </label>

        <label className="form-field">
          <span>Estimated guest count *</span>
          <input
            type="number"
            name="guest-count"
            min="1"
            inputMode="numeric"
            placeholder="Approximate is perfect"
            required
          />
        </label>

        <label className="form-field form-field-full">
          <span>Event details *</span>
          <textarea
            name="event-details"
            rows={5}
            placeholder="Tell us about the occasion, timing, service style, dietary needs, and anything else we should know."
            required
          />
        </label>
      </div>

      <div className="form-submit">
        <p>
          {status === "error"
            ? "Something went wrong. Please try again or message us on Instagram."
            : "Your inquiry will be securely saved in Netlify for the Ziki’s team to review."}
        </p>
        <button
          className="button button-dark"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send event inquiry"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
}
