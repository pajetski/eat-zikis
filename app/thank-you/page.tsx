import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you | Ziki’s Greek Street Eats",
  description: "Your Ziki’s event inquiry has been received.",
};

export default function ThankYouPage() {
  return (
    <main className="thank-you">
      <section className="thank-you-card">
        <p className="eyebrow blue">Inquiry received</p>
        <h1>Let’s make it delicious.</h1>
        <p>
          Thank you for thinking of Ziki’s. Alyssa will review your event
          details and follow up using the contact information you provided.
        </p>
        <Link className="button button-dark" href="/">
          Back to Ziki’s <span aria-hidden="true">←</span>
        </Link>
      </section>
    </main>
  );
}
