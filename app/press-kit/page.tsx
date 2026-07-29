import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const instagramUrl = "https://www.instagram.com/eatzikis/";

const colors = [
  ["Charcoal", "#14130F"],
  ["Warm ivory", "#F4EDDC"],
  ["Paper", "#FBF7ED"],
  ["Aegean blue", "#0D4596"],
  ["Coastal blue", "#77A7D8"],
  ["Olive", "#66713B"],
  ["Tomato", "#DC4B2C"],
];

const photos = [
  {
    name: "Chicken gyro",
    src: "/menu/chicken-gyro.jpg",
    alt: "Chicken gyro with feta, tomato, lettuce, red onion, and tzatziki",
  },
  {
    name: "Lamb gyro",
    src: "/menu/lamb-gyro.jpg",
    alt: "Lamb gyro with feta, tomato, lettuce, red onion, and tzatziki",
  },
  {
    name: "Trio of dips",
    src: "/menu/trio-of-dips.jpg",
    alt: "Three Greek dips with pita and fresh vegetables",
  },
];

export const metadata: Metadata = {
  title: "Press Kit | Ziki’s Greek Street Eats",
  description:
    "Download Ziki’s approved brand story, founder bio, logo, photography, colors, and press-ready assets.",
  openGraph: {
    title: "Press Kit | Ziki’s Greek Street Eats",
    description:
      "Approved story, founder bio, visual identity, photography, and downloadable press assets for Ziki’s.",
    images: ["/og-v2.jpg"],
  },
};

export default function PressKitPage() {
  return (
    <main className="press-page">
      <header className="site-header press-site-header">
        <Link className="brand" href="/" aria-label="Ziki's home">
          <span className="brand-name">ZIKI’S</span>
          <span className="brand-kicker">Greek Street Eats</span>
        </Link>

        <nav aria-label="Press kit navigation">
          <Link href="/">Home</Link>
          <Link href="/#story">Our story</Link>
          <Link href="/#menu">Menu</Link>
          <Link href="/#inquire">Inquire</Link>
        </nav>

        <a
          className="header-cta"
          href="/downloads/zikis-press-kit.zip"
          download
        >
          Download the kit
          <span aria-hidden="true">↓</span>
        </a>
      </header>

      <section className="press-hero">
        <div className="press-hero-copy">
          <p className="eyebrow blue">Press, partners & collaborators</p>
          <h1>
            The Ziki’s
            <br />
            <em>press kit.</em>
          </h1>
          <p>
            Approved stories, brand standards, logos, and photography for
            editorial coverage, event listings, and partner promotion.
          </p>
          <div className="press-actions">
            <a
              className="button button-dark"
              href="/downloads/zikis-press-kit.zip"
              download
            >
              Download everything <span aria-hidden="true">↓</span>
            </a>
            <a
              className="text-link"
              href="/downloads/zikis-brand-guide.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View brand guide ↗
            </a>
          </div>
        </div>
        <div className="press-hero-image">
          <Image
            src="/og-v2.jpg"
            alt="Ziki’s Greek Street Eats press image featuring a chicken gyro"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="press-facts" aria-label="Ziki's fast facts">
        <div>
          <span>01</span>
          <strong>San Diego, California</strong>
          <small>Home base</small>
        </div>
        <div>
          <span>02</span>
          <strong>Alyssa Gosselin</strong>
          <small>Founder</small>
        </div>
        <div>
          <span>03</span>
          <strong>Organic ingredients</strong>
          <small>Ingredient standard</small>
        </div>
        <div>
          <span>04</span>
          <strong>No seed oils</strong>
          <small>Kitchen standard</small>
        </div>
      </section>

      <section className="press-section press-story">
        <div className="press-section-heading">
          <p className="eyebrow blue">01 / The story</p>
          <h2>Power food, made personal.</h2>
        </div>
        <div className="press-story-grid">
          <div className="press-founder-card">
            <Image
              src="/alys-profile.jpg"
              alt="Alyssa Gosselin, founder of Ziki’s"
              width={150}
              height={150}
            />
            <div>
              <span>Founder</span>
              <h3>Alyssa Gosselin</h3>
            </div>
          </div>
          <div className="press-story-copy">
            <p className="press-lead">
              Ziki’s is a San Diego pop-up serving bright, modern Greek street
              food made with organic ingredients and no seed oils.
            </p>
            <p>
              Inspired by her background in movement, meal preparation, and
              dietary research, Alyssa creates fresh, nourishing food with the
              discipline of an athlete and the warmth of a host. Through
              curated pop-ups, local business collaborations, and private
              events, Ziki’s brings a sunny, personal point of view to every
              gathering.
            </p>
          </div>
        </div>
      </section>

      <section className="press-copy-section">
        <div className="press-copy-card">
          <span className="press-card-number">Short boilerplate</span>
          <p>
            Ziki’s Greek Street Eats brings fresh, generous Greek food to
            pop-ups, local businesses, and private gatherings throughout San
            Diego. Founded by Alyssa Gosselin, Ziki’s pairs craveable classics
            with organic ingredients, a no-seed-oils standard, and warm,
            personal hospitality.
          </p>
        </div>
        <div className="press-copy-card press-copy-card-blue">
          <span className="press-card-number">Founder bio</span>
          <p>
            Alyssa Gosselin is the founder of Ziki’s Greek Street Eats. Her
            approach to food is shaped by movement, meal preparation, and
            ongoing dietary research. She created Ziki’s to serve fresh,
            satisfying power food while bringing thoughtful hospitality to
            gatherings throughout San Diego.
          </p>
        </div>
      </section>

      <section className="press-section press-identity">
        <div className="press-section-heading">
          <p className="eyebrow blue">02 / Visual identity</p>
          <h2>Sun-washed, bold, and generous.</h2>
        </div>

        <div className="press-colors" aria-label="Ziki's color palette">
          {colors.map(([name, hex]) => (
            <div className="press-color" key={hex}>
              <span style={{ backgroundColor: hex }} />
              <strong>{name}</strong>
              <small>{hex}</small>
            </div>
          ))}
        </div>

        <div className="press-logo-grid">
          <div className="press-logo-preview">
            <Image
              src="/zikis-logo.jpg"
              alt="Ziki’s Greek Street Eats white-on-black logo"
              width={150}
              height={150}
            />
          </div>
          <div className="press-logo-copy">
            <p className="eyebrow blue">Logo guidance</p>
            <h3>The supplied web lockup.</h3>
            <p>
              Use the white-on-black lockup on quiet backgrounds with generous
              clear space. Do not stretch, outline, shadow, recolor, or place it
              over busy food photography.
            </p>
            <p className="press-note">
              The current supplied logo is web resolution. A vector master is
              the next recommended brand asset.
            </p>
            <a
              className="button button-dark"
              href="/zikis-logo.jpg"
              download="ZIKIS_Logo_Web.jpg"
            >
              Download web logo <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      <section className="press-section press-photo-section">
        <div className="press-section-heading">
          <p className="eyebrow light">03 / Photography</p>
          <h2>Food first. Sunlight always.</h2>
          <p>
            Warm stone, cobalt ceramics, crisp produce, visible herbs, and
            abundant texture create a recognizable Ziki’s world.
          </p>
        </div>

        <div className="press-photo-grid">
          {photos.map((photo) => (
            <article className="press-photo-card" key={photo.name}>
              <div className="press-photo">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                />
              </div>
              <div>
                <h3>{photo.name}</h3>
                <a href={photo.src} download>
                  Download JPG ↓
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="press-disclosure">
          These food photographs are AI-created placeholders for mockups and
          Ziki’s-owned digital channels until original photography is supplied.
          Confirm replacement requirements before third-party editorial
          publication.
        </p>
      </section>

      <section className="press-download-section">
        <div>
          <p className="eyebrow light">04 / Downloads</p>
          <h2>Everything in one place.</h2>
          <p>
            The complete package includes the brand guide, approved copy, web
            logo, founder image, social card, and current food photography.
          </p>
        </div>
        <div className="press-download-list">
          <a href="/downloads/zikis-press-kit.zip" download>
            <span>Complete press kit</span>
            <strong>ZIP ↓</strong>
          </a>
          <a
            href="/downloads/zikis-brand-guide.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <span>Brand guide</span>
            <strong>PDF ↗</strong>
          </a>
          <a href="/downloads/zikis-approved-copy.md" download>
            <span>Approved press copy</span>
            <strong>MD ↓</strong>
          </a>
          <a href="/og-v2.jpg" download="ZIKIS_Social_Preview.jpg">
            <span>Social sharing card</span>
            <strong>JPG ↓</strong>
          </a>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <span>ZIKI’S</span>
          <small>Greek Street Eats</small>
        </div>
        <div className="footer-note">
          <p>Press resources and brand assets.</p>
          <p>San Diego, California.</p>
        </div>
        <div className="footer-links">
          <a href={instagramUrl} target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
          <Link href="/">Back home ↗</Link>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Ziki’s</p>
      </footer>
    </main>
  );
}
